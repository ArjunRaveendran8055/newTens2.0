import { createSlice } from "@reduxjs/toolkit";

const initialState={
    toastView:false,
    type:"",
    msg:""
}

const toastSlice=createSlice({
    name:"toast",
    initialState,
    reducers:{
        setToastView:(state,actions)=>{
            state.toastView=true;
            state.type=actions.payload.type;
            state.msg=actions.payload.msg;
        },
        hideToastView:(state)=>{
            state.toastView=false,
            state.type="",
            state.msg=""
        }
    }
})

export default toastSlice.reducer

export const {setToastView,hideToastView}=toastSlice.actions