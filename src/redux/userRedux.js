import { createSlice } from "@reduxjs/toolkit"
import { updateToken } from "../requestMethods";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart: (state)=>{
            state.isFetching=true;
        },
        loginSuccess: (state, action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
            updateToken()
        },
        loginFailure: (state)=>{
            state.isFetching=false;
            state.error=true;
        },
    }
})

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;