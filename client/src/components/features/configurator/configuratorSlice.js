import { createSlice } from "@reduxjs/toolkit"

const initialState={
    openConfigurator:false,
    theme:"white",
    textColor:"black"
}

const configuratorSlice=createSlice({
    name:"configurator",
    initialState,
    reducers:{
        setOpenConfigurator:(state)=>{
            state.openConfigurator=!state.openConfigurator
        }
    }
})


export const {setOpenConfigurator}=configuratorSlice.actions

export default configuratorSlice.reducer