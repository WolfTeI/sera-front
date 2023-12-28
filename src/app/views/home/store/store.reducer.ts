import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreActions } from './store.actions';
import { state } from '@angular/animations';

export const storeFeatureKey = 'store';

export interface ConfigData {
  nombreApp: string;
  user: UserConfig;
}
interface UserConfig{
  nombre: string;
  grado: string;
  institucion: string;
  dependencia: string;
  oficina: string;
  membrete: string;
}

export const initialState: ConfigData = {
  nombreApp: '',
  user: {
    nombre: '',
    grado: '',
    institucion: '',
    dependencia: '',
    oficina: '',
    membrete: ''
  }
};

export const reducer = createReducer(
  initialState,
  on(StoreActions.loadStores, state => state),
  on(StoreActions.loadStoresSuccess, (state, {data}) => ({...state, ...data})),
  on(StoreActions.loadStoresFailure, (state, {error}) => ({...state, error})),
);

export const storeFeature = createFeature({
  name: storeFeatureKey,
  reducer,
});

