import { configureStore, ThunkAction, Action, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import searchSlice from './slices/searchSlice';

// export const store = configureStore({
//   reducer: {
//     search: searchSlice
//   },
// });
const rootReducer = combineReducers({
  search: searchSlice
})
export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
