import { Component, h } from '@stencil/core';
import PouchDB from 'pouchdb-browser';

/* If using pouchdb via script tag then do this to get typing */
// declare var PouchDB: PouchDB.Static;

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  private _dbPrimary = new PouchDB('testing_primary', { auto_compaction: true });
  private _dbSecondary = new PouchDB('testing_secondary', { auto_compaction: true });
  private _sync: any;

  async componentWillLoad() {
    this._sync = PouchDB.sync(this._dbPrimary, this._dbSecondary, {
      live: true,
      retry: true
    }).on('change', function (info) {
      // handle change
      console.log('change', info);
    }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      console.log('paused', err);
    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('active');
    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)
      console.log('denied', err);
    }).on('complete', function (info) {
      // handle complete
      console.log('complete', info);
    }).on('error', function (err) {
      // handle error
      console.log('error', err);
    });
  }

  async disconnectedCallback() {
    if (this._sync) {
      this._sync.cancel();
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>

        </main>
      </div>
    );
  }
}
