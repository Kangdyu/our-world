import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    searchTerm: {
      reducer: (state, action: PayloadAction<string>) => {
        state = action.payload;
        return state;
      },
      prepare: (term: string) => {
        return { payload: term };
      },
    },
  },
});

export const { searchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
