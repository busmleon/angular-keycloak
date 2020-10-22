import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Keycloak from 'keycloak-js';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//keycloak init options
let initOptions = {
  url: environment.KEYCLOAK_URL, realm: environment.KEYCLOAK_REALM, clientId: environment.KEYCLOAK_CLIENT
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: "login-required" }).then((auth) => {

  if (!auth) {
    window.location.reload();
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
  localStorage.setItem("ang-token", keycloak.token);
  localStorage.setItem("ang-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.debug('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
          + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });


  }, 60000)

}).catch(() => {
  console.error("Authenticated Failed");
});
