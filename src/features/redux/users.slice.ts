import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { LoginResponse } from "../../core/types/api.response";

export type UsersState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string; 
};

const initialState: UsersState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem("user token") as string | undefined,
};

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; user: Partial<User> }
>("users/register", async ({ repo, user }) => {
  return await repo.register(user);
});

export const loginUserAsync = createAsyncThunk<
  LoginResponse,
  { repo: UserRepository; user: Partial<User> }
>("users/login", async ({ repo, user }) => {
  const result = await repo.login(user);
  console.log("Token recibido del backend:", result.token);

  return result;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      localStorage.setItem("userToken", payload);
    },
    logoutUser: (state) => ({
      ...state, 
      token: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => {
      state.currentUser = payload.user;
      console.log('currentUser', payload)
      state.token = payload.token;
      console.log('TOKEN EN LOGIN USERASYNC', payload.token)
      localStorage.setItem("user token", payload.token);
    });
  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
