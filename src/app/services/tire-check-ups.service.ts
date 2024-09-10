import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLiveUserData } from '../utils/CommonoFunctions';
import { TireCheckUpDTO } from '../dtos/TireCheckUpDTO';

@Injectable({
  providedIn: 'root',
})
export class TireCheckUpsService {
  private _baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getDashboardTireCheckList(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId).set('option', '1');

    return this.http.get(this._baseURL + '/v1/tire/list', {
      params: httpParams,
    });
  }

  public getAllTireCheckList(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId).set('option', '2');

    return this.http.get(this._baseURL + '/v1/tire/list', {
      params: httpParams,
    });
  }

  public newTireCheckup(tireCheckUpDTO: TireCheckUpDTO): Observable<any> {
    return this.http.post(this._baseURL + '/v1/tire/check', tireCheckUpDTO);
  }

  public guestNewTireCheckup(tireCheckUpDTO: TireCheckUpDTO): Observable<any> {
    return this.http.post(
      this._baseURL + '/v1/guest/tire-check',
      tireCheckUpDTO
    );
  }

  public getLastTireCheck(vehicleId: string): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams()
      .set('userId', userId)
      .set('vehicleId', vehicleId);

    return this.http.get(this._baseURL + '/v1/tire/last-check', {
      params: httpParams,
    });
  }
}
