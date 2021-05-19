import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductStoreError } from '../models/product-store.error';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any, code?: number, name?: string): void {
    if (!environment.production) {
      console.error("ERROR: ", error);
    }
    const customError: ProductStoreError = {
      code: code,
      message: error.message,
      name: name
    };
    throw customError;
  }
}
