import { createSlice } from '@reduxjs/toolkit';


export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: true
  },
  reducers: {
    setIsloading: (state, action) => {
        state.loading = action.payload;
    },
  },
});

export const { setIsloading } = loadingSlice.actions;
export const getLoading = (state) => state.loading.loading;
export default loadingSlice.reducer;
