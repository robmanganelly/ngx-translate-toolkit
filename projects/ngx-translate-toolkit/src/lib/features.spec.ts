import { describe, expect, it } from 'vitest';

import { withTranslationSource, sanitizedSource, buildTranslationSource, defaultSource } from './features';

describe('Translation Features', () => {
  describe('withTranslationSource', () => {
    it('should return default source if no source is provided', () => {
      expect(withTranslationSource()).toBe(defaultSource);
    });

    it('should return sanitized source if a valid string is provided', () => {
      const validSource = 'assets/i18n/{{ lang }}.json';
      expect(withTranslationSource(validSource)).toBe(validSource);
    });

    it('should build translation source from locator', () => {
      const locator = { assetsPath: 'custom/assets', locator: 'en' };
      expect(withTranslationSource(locator)).toBe('custom/assets/i18n/en/{{ lang }}.json');
    });
  });

  describe('sanitizedSource', () => {
    it('should return the source if it is valid', () => {
      const validSource = 'assets/i18n/{{ lang }}.json';
      expect(sanitizedSource(validSource)).toBe(validSource);
    });

    it('should throw an error if the source is invalid', () => {
      const invalidSource = 'assets/i18n/en.js';
      expect(() => sanitizedSource(invalidSource)).toThrowError();
    });
  });

  describe('buildTranslationSource', () => {
    it('should build the correct translation source path', () => {
      const locator = { assetsPath: 'custom/assets', locator: 'en' };
      expect(buildTranslationSource(locator)).toBe('custom/assets/i18n/en/{{ lang }}.json');
    });
  });
});
