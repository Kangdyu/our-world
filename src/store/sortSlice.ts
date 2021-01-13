import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountryInfo } from '../api/types';

export interface ISortState {
  sortField: keyof ICountryInfo;
  isAscendingOrder: boolean;
}

const initialState: ISortState = {
  sortField: 'name',
  isAscendingOrder: true,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    sortBy: {
      reducer: (state, action: PayloadAction<keyof ICountryInfo>) => {
        if (state.sortField === action.payload) {
          state.isAscendingOrder = !state.isAscendingOrder;
        } else {
          state.sortField = action.payload;
          state.isAscendingOrder = true;
        }
      },
      prepare: (field: keyof ICountryInfo) => {
        return { payload: field };
      },
    },
  },
});

export const { sortBy } = sortSlice.actions;
export const sortReducer = sortSlice.reducer;
