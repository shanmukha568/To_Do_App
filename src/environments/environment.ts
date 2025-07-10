// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDn47m_Z2HBNaPOsnuqIBJP1Ej4UTiiJKY",
    authDomain: "to-do-app-cc74c.firebaseapp.com",
    projectId: "to-do-app-cc74c",
    storageBucket: "to-do-app-cc74c.firebasestorage.app",
    messagingSenderId: "55242326163",
    appId: "1:55242326163:web:ab4c2825d3113322384d66"
  }
};

const app = initializeApp(environment.firebase);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
