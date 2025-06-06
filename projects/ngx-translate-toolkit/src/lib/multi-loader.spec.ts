import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MultiLoader } from './multi-loader';
import { HttpBackend, provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT, provideZonelessChangeDetection } from '@angular/core';

describe('MultiLoader', () => {
  let http: HttpBackend;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpBackend);
    doc = TestBed.inject(DOCUMENT);
  });

  it('should create an instance with HttpBackend', () => {
    expect(new MultiLoader(http, [])).toBeInstanceOf(MultiLoader);
  });

  it('should create an instance with Document', () => {
    expect(new MultiLoader(doc, [])).toBeInstanceOf(MultiLoader);
  });

  // TODO: add tests for loading translations

});
