// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://34.195.85.222:3000/',
  // baseUrl: 'http://localhost:3000/',
  firebase: {
    apiKey: "AIzaSyAX5cPy9Lw_q3Oi2jg0gyQ5LDZN97_3prU",
    authDomain: "crave-ddfee.firebaseapp.com",
    databaseURL: "https://crave-ddfee.firebaseio.com",
    projectId: "crave-ddfee",
    storageBucket: "crave-ddfee.appspot.com",
    messagingSenderId: "627660030258",
    appId: "1:627660030258:web:16be3a97a0ce6bc29f172b",
    measurementId: "G-2SMFJRS7ZV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
