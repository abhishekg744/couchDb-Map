// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapToken:'pk.eyJ1Ijoicm9oaXRoMTciLCJhIjoiY2tjMXZpaHplMG1qNDJybGY4NG00MW5xNiJ9.p2PZsJzou8b6DAjskvmolA',
  syncGatewayURL: "http://localhost:4984/bucket1",
  bucketName: 'bucket1',
  serverUrl:'http://localhost:9091/api/v1/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
