import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { id: number; email: string; name: string; isAdmin: boolean } | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: null,
  status: "idle"
};

export const login = createAsyncThunk(
  "user/login",
  async (info: { email: string; password: string }) => {
    const res = await axios.post("/api/auth/login", info, { withCredentials: true });
    return res.data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
});

export const register = createAsyncThunk(
  "user/register",
  async (info: { email: string; password: string; name: string }) => {
    const res = await axios.post("/api/auth/register", info, { withCredentials: true });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(login.pending, state => {
        state.status = "loading";
      })
      .addCase(login.rejected, state => {
        state.status = "failed";
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      });
  }
});

export default userSlice.reducer;
