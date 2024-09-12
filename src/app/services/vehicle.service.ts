import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLiveUserData } from '../utils/CommonoFunctions';
import { VehicleDTO } from '../dtos/VehicleDTO';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private _baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public registerNewVehicle(dto: VehicleDTO): Observable<any> {
    return this.http.post(this._baseURL + '/v1/vehicle/insert', dto);
  }

  public getDashboardVehicleList(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId).set('option', '1');

    return this.http.get(this._baseURL + '/v1/vehicle/list', {
      params: httpParams,
    });
  }

  public getAllVehicleList(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId!).set('option', '2');

    return this.http.get(this._baseURL + '/v1/vehicle/list', {
      params: httpParams,
    });
  }

  public getUserVehicleList(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId!);

    return this.http.get(this._baseURL + '/v1/vehicle/user-vehicle-list', {
      params: httpParams,
    });
  }
}
