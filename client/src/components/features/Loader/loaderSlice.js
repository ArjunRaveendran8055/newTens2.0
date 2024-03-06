import { createSlice } from "@reduxjs/toolkit"

const initialState={
    loader:false
}


const loaderSlice=createSlice({
    name:"loader",
    initialState,
    reducers:{
        setLoader:(state)=>{
            state.loader=true
        },
        removeLoader:(state)=>{
            state.loader=false
        }
    }
})


export const {setLoader,removeLoader}=loaderSlice.actions

export default loaderSlice.reducer