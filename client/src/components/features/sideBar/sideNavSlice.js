import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isOpen:false,
    theme:"white",
    textColor:"black"
}

const sideNavSlice=createSlice({
    name:"sideNav",
    initialState,
    reducers:{
        setIsOpen:(state)=>{
            state.isOpen=!state.isOpen;
        }
    }
})


export const {setIsOpen}=sideNavSlice.actions

export default sideNavSlice.reducer