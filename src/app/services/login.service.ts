import { Injectable } from '@angular/core';
import { NgKeycloakService } from 'ng-keycloak';
import { KeycloakConfig } from 'ng-keycloak/lib/_model/keycloak-config.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private keycloakConfig: KeycloakConfig = {
    BASE_URL: environment.KEYCLOAK_URL,
    realm: environment.KEYCLOAK_REALM,
    clientId: environment.KEYCLOAK_CLIENT,
    credentials: {
      secret: ''
    }
  };

  constructor(private ngKeycloakService: NgKeycloakService) {
    this.ngKeycloakService._setkeycloakConfig(this.keycloakConfig);
  }

  public login(username: string, password: string): void {
    this.ngKeycloakService.login(username, password).pipe().subscribe(loginSuccessResponse => {
      console.log('Login Success', loginSuccessResponse);
    }, loginErrorResponse => {
      console.log('Login Error Response', loginErrorResponse);
    });
  }
  // static login(httpClient: HttpClient): void {
  //   console.log('Start')
  //   const post = { client_id: environment.KEYCLOAK_CLIENT, username: 'employee2', password: '1234', grant_type: 'password' }
  //   const body = JSON.stringify(post);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  //   const url = environment.KEYCLOAK_URL + '/realms/' + environment.KEYCLOAK_REALM + '/protocol/openid-connect/token'
  //   const test = httpClient.post(url, body, { headers: headers })
  //   let haha: string
  //   test.subscribe(response => haha = response.toString())
  //   console.log(haha)
  //   // test.toPromise().then(o => console.log(o.toString()))
  //   console.log('Ende')
  //   // localStorage.setItem("ang-token", keycloak.token);
  //   // localStorage.setItem("ang-refresh-token", keycloak.token);
  // }

}
