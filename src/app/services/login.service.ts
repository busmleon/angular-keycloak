import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static login(httpClient: HttpClient): void {
    console.log('Start')
    const post = { client_id: environment.KEYCLOAK_CLIENT, username: 'employee2', password: '1234', grant_type: 'password' }
    const body = JSON.stringify(post);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    const url = environment.KEYCLOAK_URL + '/realms/' + environment.KEYCLOAK_REALM + '/protocol/openid-connect/token'
    const test = httpClient.post(url, body, { headers: headers })
    let haha: string
    test.subscribe(response => haha = response.toString())
    console.log(haha)
    // test.toPromise().then(o => console.log(o.toString()))
    console.log('Ende')
    // localStorage.setItem("ang-token", keycloak.token);
    // localStorage.setItem("ang-refresh-token", keycloak.token);
  }

}
