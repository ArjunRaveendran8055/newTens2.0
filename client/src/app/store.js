import {configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"
import sideNavReducer from "../components/features/sideBar/sideNavSlice"
import configuratorSlice from "../components/features/configurator/configuratorSlice"

configuratorSlice
const persistConfig={
    key:'root',
    storage
}

const persistedSideNavReducer=persistReducer(persistConfig,sideNavReducer)
const persistedConfiguratorReducer=persistReducer(persistConfig,configuratorSlice)


const store=configureStore({
    reducer:{
        sideNav:persistedSideNavReducer,
        configurator:persistedConfiguratorReducer
 
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false},),
})


const persistor=persistStore(store)



export {store,persistor}