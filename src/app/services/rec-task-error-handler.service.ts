import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecTaskErrorHandlerService implements ErrorHandler{
  constructor(private injector: Injector) {
   }
  handleError(error: any): void {
    console.error('An error occured: ',error)
    throw error;
  }
}
