import { createAction, props } from '@ngrx/store';
import { InscriptionHistory } from '../../core/models/historial.interface';

export const addInscriptionHistory = createAction(
  '[Inscription History] Add History',
  props<{ history: InscriptionHistory }>()
);

export const loadInscriptionHistory = createAction(
  '[Inscription History] Load History'
);

export const loadInscriptionHistorySuccess = createAction(
  '[Inscription History] Load History Success',
  props<{ history: InscriptionHistory[] }>()
);

export const loadInscriptionHistoryFailure = createAction(
  '[Inscription History] Load History Failure',
  props<{ error: any }>()
);