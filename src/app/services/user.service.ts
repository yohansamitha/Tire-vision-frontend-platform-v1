import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationDTO } from '../dtos/RegistrationDTO';
import { getLiveUserData } from '../utils/CommonoFunctions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public findUserById(): Observable<any> {
    const userId = getLiveUserData().userId;
    let httpParams = new HttpParams().set('userId', userId!);

    return this.http.get(this._baseURL + '/v1/user/find', {
      params: httpParams,
    });
  }

  public updateUserDetails(dto: RegistrationDTO): Observable<any> {
    return this.http.put(this._baseURL + '/v1/user/update', dto);
  }
}
