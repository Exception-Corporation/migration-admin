import { createSlice } from '@reduxjs/toolkit';
import { EXAMPLE_SLICE_NAME } from '@/infrastructure/reducer/action-types/example.actionTypes';
import { GET_DATA } from '@/infrastructure/reducer/action/example.action';

export interface IExample {
  data: object | null;
}

const initialState: IExample = {
  data: null
};

const exampleSlice = createSlice({
  name: EXAMPLE_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CASES
      .addCase(GET_DATA.fulfilled, (state: IExample, action) => {
        state.data = action.payload;
      });
  }
});

export default exampleSlice.reducer;
