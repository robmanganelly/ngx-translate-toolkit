import {
  mergeDeep,
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core';
import {
  catchError,
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { languageSourcePlaceholder } from './constants';
import {
  HttpBackend,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { isDevMode, Type } from '@angular/core';

const fallback = () =>
  Promise.reject('fetch not available, is this server side ?');


export class MultiLoader implements TranslateLoader {
  #isHttp: boolean;

  constructor(
    private _api: Document | HttpBackend,
    private _sources: string[]
  ) {
    this.#isHttp = _api instanceof HttpBackend;
  }

  #buildUrl(source: string, lang: string) {
    return source.replace(languageSourcePlaceholder, lang);
  }

  async #get(urls: string[]): Promise<TranslationObject> {

    if (!this.#isHttp) {
      throw new Error('MultiLoader must be used with HttpBackend');
    }

    // TODO optimize for httpBackend <Observable API>
    const translations = await Promise.all(
      urls.map((url) =>
        firstValueFrom(
          (this._api as HttpBackend).handle(new HttpRequest('GET', url)).pipe(
            filter((e) => e instanceof HttpResponse),
            map((r) => r.body),
            catchError((r: HttpErrorResponse) => {
              console.warn(r.url, r.statusText, 'while fetching translations');
              return of({} as TranslationObject);
            })
          )
        )
      )
    );
    return translations.reduce(
      (acc, curr) => mergeDeep(acc, curr),
      {} as TranslationObject
    );
  }

  async #fetchData(urls: string[]): Promise<TranslationObject> {
    const responses = await Promise.all(urls.map((u) => ((this._api as Document).defaultView?.fetch ?? fallback)(u)));
    // log errors if any
    responses.forEach((r) => {
      if (!r.ok)
        console.warn(r.url, r.statusText, 'while fetching translations');
    });
    const translations: TranslationObject[] = await Promise.all(
      responses.map((r) => (r.ok ? r.json() : Promise.resolve({})))
    );
    return translations.reduce(
      (acc, curr) => mergeDeep(acc, curr),
      {} as TranslationObject
    );
  }

  // implementation
  getTranslation(lang: string): Observable<TranslationObject> {
    const urls = this._sources.map((s) => this.#buildUrl(s, lang));

    const fetcher = this.#isHttp ? this.#fetchData(urls) : this.#get(urls);

    return from(fetcher).pipe(
      catchError((err) => {
        if (isDevMode()) console.error('MultiLoader error', err);
        return of({} as TranslationObject);
      })
    );
  }
}
