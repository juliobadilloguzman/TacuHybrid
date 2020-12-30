import { TestBed } from '@angular/core/testing';

import { TaqueriaService } from './taqueria.service';

describe('TaqueriaService', () => {
  let service: TaqueriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaqueriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
