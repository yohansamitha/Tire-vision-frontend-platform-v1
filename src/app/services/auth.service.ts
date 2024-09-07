import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dtos/LoginDTO';
import { RegistrationDTO } from '../dtos/RegistrationDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.authUrl;
  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public login(loginDto: LoginDTO): Observable<any> {
    return this.http.post(this.authURL + '/login', loginDto);
  }

  public register(dto: RegistrationDTO): Observable<any> {
    return this.http.post(this.baseURL + '/v1/user/register', dto);
  }

  public forgotPassword(email: string): Observable<any> {
    let httpParams = new HttpParams().set('email', email);
    return this.http.post(this.baseURL + '/v1/user/forgot-password', null, {
      params: httpParams,
    });
  }

  public resetPassword(
    email: string,
    verificationCode: string,
    newPassword: string
  ): Observable<any> {
    const password = btoa(newPassword.trim());
    let httpParams = new HttpParams()
      .set('email', email)
      .set('verificationCode', verificationCode)
      .set('newPassword', password);
    return this.http.post(this.baseURL + '/v1/user/reset-password', null, {
      params: httpParams,
    });
  }
}
