import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WinnerWithCar, SortField, SortOrder } from '@/shared/types';

interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  page: number;
  sort: SortField;
  order: SortOrder;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  page: 1,
  sort: 'wins',
  order: 'DESC',
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinners(
      state,
      action: PayloadAction<{ winners: WinnerWithCar[]; totalCount: number }>,
    ) {
      state.winners = action.payload.winners;
      state.totalCount = action.payload.totalCount;
    },

    setWinnersPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    /**
     * Toggles sort: same field → flip order; different field → DESC by default.
     * Server handles the actual sorting via query params.
     */
    setSort(
      state,
      action: PayloadAction<SortField>,
    ) {
      if (state.sort === action.payload) {
        state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sort = action.payload;
        state.order = 'DESC';
      }
      state.page = 1; // reset to first page on sort change
    },
  },
});

export const { setWinners, setWinnersPage, setSort } = winnersSlice.actions;
export default winnersSlice.reducer;
