import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from './store.reducer';

export const selectStoreState = createFeatureSelector<fromStore.ConfigData>(
  fromStore.storeFeatureKey
);

export const selectConfigData = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state
);

export const selectNombreApp = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.nombreApp
);

export const selectUser = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.user
);

export const selectInstitucion = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.user.institucion
);

export const selectDependencia = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.user.dependencia
);

export const selectOficina = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.user.oficina
);

export const selectMembrete = createSelector(
  selectStoreState,
  (state: fromStore.ConfigData) => state.user.membrete
);
