import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isLoggedIn: false,
  PendingUserList:[]
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,actions)=>{
            state.user=actions.payload;
            state.isLoggedIn=true
        },
    }
})


export const {setUser}=userSlice.actions

export default userSlice.reducer