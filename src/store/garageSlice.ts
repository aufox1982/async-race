import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CAR_COLOR } from '@/constants';
import type { Car, CarEngineState, EngineStatus } from '@/shared/types';

interface GarageState {
  cars: Car[];
  totalCount: number;
  page: number;
  selectedCar: Car | null;
  createForm: { name: string; color: string };
  editForm: { name: string; color: string };
  /** Per-car engine state keyed by car ID. */
  engineStates: Record<number, CarEngineState>;
  raceStatus: 'idle' | 'racing' | 'finished';
  /** ID of the first car to finish in the current race, or null. */
  winnerId: number | null;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  page: 1,
  selectedCar: null,
  createForm: { name: '', color: DEFAULT_CAR_COLOR },
  editForm: { name: '', color: DEFAULT_CAR_COLOR },
  engineStates: {},
  raceStatus: 'idle',
  winnerId: null,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCars(
      state,
      action: PayloadAction<{ cars: Car[]; totalCount: number }>,
    ) {
      state.cars = action.payload.cars;
      state.totalCount = action.payload.totalCount;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setSelectedCar(state, action: PayloadAction<Car | null>) {
      state.selectedCar = action.payload;
      if (action.payload) {
        state.editForm = {
          name: action.payload.name,
          color: action.payload.color,
        };
      }
    },

    setCreateForm(
      state,
      action: PayloadAction<Partial<{ name: string; color: string }>>,
    ) {
      state.createForm = { ...state.createForm, ...action.payload };
    },

    setEditForm(
      state,
      action: PayloadAction<Partial<{ name: string; color: string }>>,
    ) {
      state.editForm = { ...state.editForm, ...action.payload };
    },

    setEngineState(
      state,
      action: PayloadAction<{ id: number; status: EngineStatus; duration?: number }>,
    ) {
      const { id, status, duration = 0 } = action.payload;
      state.engineStates[id] = { status, duration };
    },

    setRaceStatus(
      state,
      action: PayloadAction<'idle' | 'racing' | 'finished'>,
    ) {
      state.raceStatus = action.payload;
    },

    setWinnerId(state, action: PayloadAction<number | null>) {
      state.winnerId = action.payload;
    },

    /** Clears all per-car engine states and resets race to idle. */
    resetRace(state) {
      state.engineStates = {};
      state.raceStatus = 'idle';
      state.winnerId = null;
    },
  },
});

export const {
  setCars,
  setPage,
  setSelectedCar,
  setCreateForm,
  setEditForm,
  setEngineState,
  setRaceStatus,
  setWinnerId,
  resetRace,
} = garageSlice.actions;

export default garageSlice.reducer;
