import { createReducer, on } from '@ngrx/store';
import { InscriptionHistory } from '../../core/models/historial.interface';
import * as InscriptionHistoryActions from '../store/inscriptions.actions';

export interface State {
  history: InscriptionHistory[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  history: [],
  loading: false,
  error: null
};

export const inscriptionHistoryReducer = createReducer(
  initialState,
  on(InscriptionHistoryActions.loadInscriptionHistory, state => ({
    ...state,
    loading: true
  })),
  on(InscriptionHistoryActions.loadInscriptionHistorySuccess, (state, { history }) => ({
    ...state,
    history,
    loading: false
  })),
  on(InscriptionHistoryActions.loadInscriptionHistoryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(InscriptionHistoryActions.addInscriptionHistory, (state, { history }) => ({
    ...state,
    history: [...state.history, history]
  }))
);