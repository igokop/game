import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IGenericEnvelope } from '../interfaces/general.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor(private messageService: MessageService) {}

  handleError(httpError: HttpErrorResponse): Observable<any> {
    return from(this.transformError(httpError));
  }

  private async transformError(httpError: HttpErrorResponse) {
    if (httpError.error && httpError.error.message) {
      this.messageService.showMessage(httpError.error.message);
    }

    const apiError: IGenericEnvelope<any> = { ...httpError.error };

    return {
      message: apiError.message,
      result: apiError.result,
    };
  }
}
