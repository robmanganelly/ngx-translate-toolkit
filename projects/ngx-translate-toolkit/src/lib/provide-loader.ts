import { DOCUMENT, FactoryProvider } from '@angular/core';
import { TranslationSource, withTranslationSource } from './features';
import { TranslateLoader } from '@ngx-translate/core';
import { MultiLoader } from './multi-loader';
import { HttpBackend } from '@angular/common/http';

/**
 * Use when providing {@link TranslateService }. Add any sources for translations
 *
 * It uses fetch API
 * Use only with client-side rendered applications,
 * if your app is rendered by the server prefer {@link provideHttpMultiLoader }
 *
 * Example
 * ```typescript
 * provideTranslateService({
 *   //...other properties
 *   loader: provideFetchMultiLoader(
 *      // do not include the host application source, this one is included by default
 *      withTranslationSource({ locator: 'my-lib-name' }),
 *      withTranslationSource({ locator: 'another-lib-name' }),
 *   )
 * })
 *
 * ```
 *
 * @param features
 * @returns
 */
export const provideFetchMultiLoader = (
  ...features: TranslationSource[]
): FactoryProvider => ({
  provide: TranslateLoader,
  useFactory: (_document: Document) =>
    new MultiLoader(false, _document, [withTranslationSource(), ...features]),
  deps: [DOCUMENT],
});

/**
 * Use when providing {@link TranslateService }. Add any sources for translations
 *
 * It uses httpBackend
 * If you prefer using fetch API use {@link provideFetchMultiLoader }
 *
 * Example
 * ```typescript
 * provideTranslateService({
 *   //...other properties
 *   provideHttpClient(),
 *   loader: provideHttpMultiLoader(
 *      // do not include the host application source, this one is included by default
 *      withTranslationSource({ locator: 'my-lib-name' }),
 *      withTranslationSource({ locator: 'another-lib-name' }),
 *   )
 * })
 *
 * ```
 *
 * @param features
 * @returns
 */
export const provideHttpMultiLoader = (
  ...features: TranslationSource[]
): FactoryProvider => ({
  provide: TranslateLoader,
  useFactory: (_http: HttpBackend) =>
    new MultiLoader(true, _http, [withTranslationSource(), ...features]),
  deps: [HttpBackend],
});
