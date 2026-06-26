import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import garageReducer from './garageSlice';
import winnersReducer from './winnersSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Type-safe dispatch hook — use everywhere instead of plain useDispatch. */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Type-safe selector hook — use everywhere instead of plain useSelector. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
