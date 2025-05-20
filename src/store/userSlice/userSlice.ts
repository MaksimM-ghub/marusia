import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  surname: string;
  email: string;
}

const initialState: UserState = {
  name: "",
  surname: "",
  email: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserField: (
      state,
      action: PayloadAction<{ field: keyof UserState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetUser: () => initialState,
  },
});

export const { setUserField, resetUser } = userSlice.actions;

export default userSlice.reducer;