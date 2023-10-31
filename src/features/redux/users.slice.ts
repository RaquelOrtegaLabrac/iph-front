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
  token: localStorage.getItem("userToken") as string | undefined,
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
  localStorage.setItem("userToken", result.token as string);
  return result;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
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
      console.log("Token from server (fulfilled):", payload.token);

      return {
        ...state,
        currentUser: payload.user,
        token: payload.token,
      };
    });

  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
