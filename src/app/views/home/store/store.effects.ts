import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { StoreActions } from './store.actions';
import data from '../../../config/config.json';
import { ConfigData } from './store.reducer';


@Injectable()
export class StoreEffects {

  loadStores$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.loadStores),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getConfig().pipe(
          map(data => StoreActions.loadStoresSuccess({ data })),
          catchError(error => of(StoreActions.loadStoresFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}

  getConfig(): Observable<ConfigData> {
    return of(data);
  }
}
