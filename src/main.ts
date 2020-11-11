import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (location.protocol === 'http:') {
    window.location.href = location.href.replace('http', 'https');
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// //keycloak init options
// const initOptions = {
//   url: environment.KEYCLOAK_URL, realm: environment.KEYCLOAK_REALM, clientId: environment.KEYCLOAK_CLIENT
// }

// const keycloak = Keycloak(initOptions);

// keycloak.init({ onLoad: "login-required" }).then((auth) => {

//   if (!auth) {
//     window.location.reload();
//   }

//   platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));
//   localStorage.setItem("ang-token", keycloak.token);
//   localStorage.setItem("ang-refresh-token", keycloak.refreshToken);

//   setTimeout(() => {
//     keycloak.updateToken(70).then((refreshed) => {
//       if (refreshed) {
//         console.debug('Token refreshed' + refreshed);
//       } else {
//         console.warn('Token not refreshed, valid for '
//           + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//       }
//     }).catch(() => {
//       console.error('Failed to refresh token');
//     });


//   }, 60000)

// }).catch(() => {
//   console.error("Authenticated Failed");
// });
