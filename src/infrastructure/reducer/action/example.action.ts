import { createAsyncThunk } from '@reduxjs/toolkit';
import { EXAMPLE } from '@/infrastructure/reducer/action-types/example.actionTypes';

export const GET_DATA = createAsyncThunk(EXAMPLE.GET_DATA, async () => {
  const response = await Promise.resolve({ data: {} });
  return response.data;
});
