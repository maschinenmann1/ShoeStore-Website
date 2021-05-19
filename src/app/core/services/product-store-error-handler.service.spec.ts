import { TestBed } from '@angular/core/testing';

import { ProductStoreErrorHandlerService } from './product-store-error-handler.service';

describe('ProductStoreErrorHandlerService', () => {
  let service: ProductStoreErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStoreErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
