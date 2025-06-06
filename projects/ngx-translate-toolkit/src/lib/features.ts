import { languageSourcePlaceholder } from './constants';

export type TranslationSourceLocator = {
  assetsPath?: string; // optional path to translation files
  locator: string;
};

export type TranslationSource = string;

/**
 * assumes that no custom path is required, and builds the default source for the application
 */
export const defaultSource = `i18n/${languageSourcePlaceholder}.json`;

export const sanitizedSource = (source: string): TranslationSource => {
  if (source.endsWith(`${languageSourcePlaceholder}.json`)) return source;
  else
    throw new Error(
      `Invalid translation source: ${source}. Must end with '${languageSourcePlaceholder}.json'`
    );
};

export const buildTranslationSource = (
  source: TranslationSourceLocator
): TranslationSource => {
  const { assetsPath = 'assets', locator } = source;
  return `${assetsPath}/i18n/${locator}/${languageSourcePlaceholder}.json`;
};

/**
 * Use this function to provide locators for translation sources in your project
 * If you only have a single source, this function is not needed. Application source is provided by default.
 * We assume that your application translation files are located in `public/i18n/{lang}.json`
 * If this is not the case, provide the source as a string with the proper format `path/${placeholder}.json`,
 * see {@link languageSourcePlaceholder}
 *
 * Builds the translation source for the given input.
 * @param source - The input source, either a string or a {@link TranslationSourceLocator} object.
 * @returns The resolved translation source.
 */
export const withTranslationSource = (
  source?: string | TranslationSourceLocator
): TranslationSource => {
  if (source === undefined) return defaultSource;
  else if (typeof source === 'string') return sanitizedSource(source);
  else return buildTranslationSource(source);
};
