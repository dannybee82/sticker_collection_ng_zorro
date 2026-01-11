import { TestBed } from '@angular/core/testing';
import { StickerService } from './sticker.service';
import { describe,beforeEach, it, expect } from 'vitest';

describe('StickerService', () => {
  let service: StickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
