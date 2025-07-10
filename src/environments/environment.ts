// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyCTlczBicfk6Ji3303KiY7v-l2DgC2ibLQ",
      authDomain: "todolist-e96f1.firebaseapp.com",
      projectId: "todolist-e96f1",
      storageBucket: "todolist-e96f1.firebasestorage.app",
      messagingSenderId: "295341046836",
      appId: "1:295341046836:web:86b34c6778714d1e731e61"
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
