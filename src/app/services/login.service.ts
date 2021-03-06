import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  private url = environment.KEYCLOAK_URL + '/realms/' + environment.KEYCLOAK_REALM + '/protocol/openid-connect/token'

  public login(username: string, password: string): void {
    const body = 'grant_type=password&client_id=' + environment.KEYCLOAK_CLIENT + '&username=' + username + '&password=' + password
    const test = this.httpClient.post(this.url, body, { headers: this.headers })
    test.subscribe(loginSuccessResponse => {
      const accessToken: string = JSON.parse(JSON.stringify(loginSuccessResponse)).access_token
      this.setToken(accessToken)
      // localStorage.setItem("ang-refresh-token", JSON.parse(JSON.stringify(loginSuccessResponse)).refresh_token)
    }, loginErrorResponse => {
      console.error('Login Error Response', loginErrorResponse);
    })
  }

  public setToken(token: string): void {
    localStorage.setItem('ang-token', token)
  }

  public getToken(): string {
    return localStorage.getItem('ang-token')
  }
}
