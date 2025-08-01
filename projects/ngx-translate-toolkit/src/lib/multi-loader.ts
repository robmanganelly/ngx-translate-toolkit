import {
  mergeDeep,
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core';
import { catchError, filter, forkJoin, from, map, Observable, of } from 'rxjs';
import { languageSourcePlaceholder } from './constants';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';

const fb = () => Promise.resolve({} as Response);

export class MultiLoader implements TranslateLoader {
  constructor(
    private http: boolean,
    private a: Document | HttpBackend,
    private src: string[]
  ) {}

  #bld(src: string, lang: string) {
    return src.replace(languageSourcePlaceholder, lang);
  }

  #merge(ts: TranslationObject[]): TranslationObject {
    return ts.reduce(
      (a, c) => mergeDeep(a, c),
      {} as TranslationObject
    );
  }

  #get$(urls: string[]): Observable<TranslationObject> {
    if (!this.http) {
      throw new Error('MultiLoader must be used with HttpBackend');
    }

    const rqs = urls
      .map((url) => new HttpRequest('GET', url, { responseType: 'json' }))
      .map((req) =>
        (this.a as HttpBackend).handle(req).pipe(
          filter((e): e is HttpResponse<unknown> => e instanceof HttpResponse),
          map((r) => (r.body ?? {}) as TranslationObject),
          catchError(() => of({} as TranslationObject))
        )
      );

    return forkJoin(rqs).pipe(map((r) => this.#merge(r)));
  }

  async #fetch(urls: string[]): Promise<TranslationObject> {
    if (this.http) {
      throw new Error('MultiLoader must be used with Fetch');
    }

    const rs = await Promise.all(
      urls.map((u) => ((this.a as Document).defaultView?.fetch ?? fb)(u))
    );
    rs.forEach((r) => {
      if (!r.ok)
        console.warn(r.url, r.statusText, 'while fetching translations');
    });

    return this.#merge(
      await Promise.all(rs.map((r) => (r.ok ? r.json() : Promise.resolve({}))))
    );
  }

  // implementation
  getTranslation(lang: string): Observable<TranslationObject> {
    const urls = this.src.map((s) => this.#bld(s, lang));

    const r$ = this.http ? this.#get$(urls) : from(this.#fetch(urls));

    return r$.pipe(
      catchError((err) => {
        if (isDevMode()) console.error('MultiLoader error', err);
        return of({} as TranslationObject);
      })
    );
  }
}
