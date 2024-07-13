import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null; 
    refreshToken: string | null; 
    isAuthenticated:boolean
}

const initialState: AuthState ={
    accessToken: null,
    refreshToken: null, 
    isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    clearAccessToken(state) {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setRefreshToken(state, action) {
        state.refreshToken = action.payload;
      },
    clearRefreshToken(state) {
        state.refreshToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken,setRefreshToken, clearRefreshToken } = authSlice.actions;
export default authSlice.reducer;