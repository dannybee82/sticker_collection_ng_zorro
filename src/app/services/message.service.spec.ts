import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { describe,beforeEach, it, expect } from 'vitest';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
