import { TestBed } from '@angular/core/testing';

import { MakeCoffeeService } from './make-coffee.service';

describe('MakeCoffeeService', () => {
  let service: MakeCoffeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeCoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
