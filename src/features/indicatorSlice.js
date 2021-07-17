import { createSlice } from '@reduxjs/toolkit';


export const indicatorSlice = createSlice({
  name: 'loading',
  initialState: {
    indicator: ""
  },
  reducers: {
    setIndicator: (state, action) => {
      state.indicator = action.payload;
    }
  },
});

export const { setIndicator } = indicatorSlice.actions;
export const getIndicator = (state) => state.indicator.indicator;
export default indicatorSlice.reducer;
