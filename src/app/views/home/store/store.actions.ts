import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConfigData } from './store.reducer';

export const StoreActions = createActionGroup({
  source: 'Store',
  events: {
    'Load Stores': emptyProps(),
    'Load Stores Success': props<{ data: ConfigData }>(),
    'Load Stores Failure': props<{ error: unknown }>(),
  }
});
