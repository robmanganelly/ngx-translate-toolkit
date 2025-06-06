import { describe, expect, it } from 'vitest';
import { languageSourcePlaceholder } from './constants';


it('should be a constant', ()=>{
  expect(languageSourcePlaceholder).toBe('{{ lang }}');
})
