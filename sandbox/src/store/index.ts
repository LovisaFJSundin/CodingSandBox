import { createSlice, configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});

export const authActions = authSlice.actions;
//export type RootState = ReturnType<typeof countReducer>
export default store