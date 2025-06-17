import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InscriptionHistoryActions from './inscriptions.actions';
import { InscriptionHistoryService } from '../services/inscriptions.service';

@Injectable()
export class InscriptionHistoryEffects {
  loadHistory$;
  addHistory$;

  constructor(
    private actions$: Actions,
    private historyService: InscriptionHistoryService
  ) {

    this.loadHistory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscriptionHistoryActions.loadInscriptionHistory),
        mergeMap(() => this.historyService.getHistory()
        .pipe(
          map(history => InscriptionHistoryActions.loadInscriptionHistorySuccess({ history })),
          catchError(error => of(InscriptionHistoryActions.loadInscriptionHistoryFailure({ error })))
        ))
      )
    );
    
    this.addHistory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InscriptionHistoryActions.addInscriptionHistory),
        mergeMap(({ history }) => this.historyService.addHistory(history)
        .pipe(
          map(() => InscriptionHistoryActions.loadInscriptionHistory()),
          catchError(error => of(InscriptionHistoryActions.loadInscriptionHistoryFailure({ error })))
        ))
      )
    );
    
  }
}