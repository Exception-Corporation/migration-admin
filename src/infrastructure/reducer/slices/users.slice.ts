import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/domain/entities/user/user.entity';

let initialState: Array<User> = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, { payload }: { payload: User | Array<User> }) => {
      if (Array.isArray(payload)) {
        state = payload;
        return;
      }

      state.push(payload);
    },
    editUser: (state, action) => {},
    deleteUser: (state, action) => {}
  }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
