import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
var PouchDB = require("pouchdb").default;

@Injectable()
export class PouchDBService {

    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();
    public cblData = new BehaviorSubject([]);
    changedData;

    public constructor() {
        if (!this.isInstantiated) {
            this.database = new PouchDB(environment.bucketName);
            this.isInstantiated = true;
        }
    }

    public fetch() {
        return this.database.allDocs({ include_docs: true });
    }

    public get(id: string) {
        return this.database.get(id);
    }

    public deleteAllDocs() {
        this.fetch().then(result => {
            for (let i = 0; i < result.rows.length; i++) {
                this.get(result.rows[i].doc._id).then(function (doc) {
                    return this.database.remove(doc);
                });
            }
        }, error => {
            console.error(error);
        });
    }

    public put(id: string, document: any) {
        document._id = id;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status == "404") {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    public sync() {
        let remoteDatabase = new PouchDB(environment.syncGatewayURL);

        // var rep = PouchDB.replicate(environment.syncGatewayURL, environment.bucketName, {
        //     live: true,
        //     retry: true
        // }).on('change', function (info) {
        //     // handle change
        //     console.log(info);
        //     this.listener.emit(info);
        // }).on('paused', function (err) {
        //     console.log(err);
        //     // replication paused (e.g. replication up to date, user went offline)
        // }).on('active', function () {
        //     console.log('active');
        //     // replicate resumed (e.g. new changes replicating, user went back online)
        // }).on('denied', function (err) {
        //     console.log(err);
        //     // a document failed to replicate (e.g. due to permissions)
        // }).on('complete', function (info) {
        //     console.log(info);
        //     // handle complete
        // }).on('error', function (err) {
        //     console.log(err);
        //     // handle error
        // });

        this.database.sync(remoteDatabase, {
            live: true
        }).on('change', change => {
            this.listener.emit(change);
        }).on('error', error => {
            console.error(JSON.stringify(error));
        });
    }

    public getChangeListener() {
        return this.listener;
    }

}
