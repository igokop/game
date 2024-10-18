import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  IGenericEnvelope,
  PeopleResponseModel,
  ShipResponseModel,
} from '../interfaces/general.interface';
import { HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(
    private httpClient: HttpClient,
    private errors: HttpErrorHandler
  ) {}

  public getUserInfo(
    number: number
  ): Observable<IGenericEnvelope<PeopleResponseModel>> {
    let url_ = `https://www.swapi.tech/api/people/${number}`;

    return this.httpClient
      .get<IGenericEnvelope<PeopleResponseModel>>(url_)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }

  public getShipInfo(
    number: number
  ): Observable<IGenericEnvelope<ShipResponseModel>> {
    let url_ = `https://www.swapi.tech/api/starships/${number}`;

    return this.httpClient
      .get<IGenericEnvelope<ShipResponseModel>>(url_)
      .pipe(
        catchError((err: HttpErrorResponse) => this.errors.handleError(err))
      );
  }
}
