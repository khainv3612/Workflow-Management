// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_API_AUTH: 'http://localhost:8080/api/auth/',
  apiUrl: 'http://localhost:8080/',
  TOKEN_KEY: 'auth-token',
  USER_KEY: 'auth-user',
  PAGEABLE_PAGE_DEFAULT : 0,
  PAGEABLE_SIZE_DEFAULT : 10,

  appVersion: 'v717demo1',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
