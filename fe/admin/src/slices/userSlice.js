import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login: false,
        account:[]
    },
    reducers: {
        login: (state,action) => {
            state.login = true;
            state.account=action.payload
        },
        logout: (state) => {
            state.login = false;
            state.account=[]
        },
    },
});
export const { login,logout } = userSlice.actions;
export default userSlice.reducer;
