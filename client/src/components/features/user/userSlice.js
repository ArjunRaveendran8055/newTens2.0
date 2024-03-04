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
        setPendingUsers:(state,actions)=>{
            state.PendingUserList=actions.payload
            console.log(actions.payload);
        }
    }
})


export const {setUser,setPendingUsers}=userSlice.actions

export default userSlice.reducer