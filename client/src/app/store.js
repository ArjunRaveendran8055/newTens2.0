import {configureStore} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistStore,persistReducer} from "redux-persist"
import sideNavReducer from "../components/features/sideBar/sideNavSlice"
import configuratorSlice from "../components/features/configurator/configuratorSlice"
import toastReducer from "../components/features/toast/toastSlice"
import userReducer from "../components/features/user/userSlice"
import loaderReducer from "../components/features/Loader/loaderSlice"

configuratorSlice
const persistConfig={
    key:'root',
    storage,
}

const persistedSideNavReducer=persistReducer(persistConfig,sideNavReducer)
const persistedConfiguratorReducer=persistReducer(persistConfig,configuratorSlice)
const persistedUser=persistReducer(persistConfig,userReducer)
const store=configureStore({
    reducer:{
        sideNav:persistedSideNavReducer,
        configurator:persistedConfiguratorReducer,
        user:persistedUser,
        toast:toastReducer,
        loader:loaderReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false},),
})
const persistor=persistStore(store)
export {store,persistor}