import {configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"
import sideNavReducer from "../components/features/sideBar/sideNavSlice"
const persistConfig={
    key:'root',
    storage
}

const persistedSideNavReducer=persistReducer(persistConfig,sideNavReducer)


const store=configureStore({
    reducer:{
        sideNav:persistedSideNavReducer,
 
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false},),
})


const persistor=persistStore(store)



export {store,persistor}