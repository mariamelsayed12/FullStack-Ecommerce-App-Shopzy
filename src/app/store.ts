import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import loginSlice from './features/loginSlice'
import signupSlice from './features/signupSlice'
import cartSlice from './features/CartSlice'
import productIdSlice from './features/productIdSlice'
import globalSlice from './features/globalSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ProductsApiSlice } from './services/Products'
import networkSlice from './features/NetworkSlice'
// ...

const persistCartConfig = {
    key: "Cart",
    storage,
};

const persistIdOfProductConfig = {
    key: "IdOfProduct",
    storage,
};



const persistedCart=persistReducer(persistCartConfig,cartSlice)
const persistedIdOfProduct=persistReducer(persistIdOfProductConfig,productIdSlice)


export const store = configureStore({
    //root reducer
    reducer: {
        Cart:persistedCart,
        login:loginSlice,
        signup:signupSlice,
        netwok:networkSlice,
        IdOfProduct:persistedIdOfProduct,
        global:globalSlice,
        [ProductsApiSlice.reducerPath]:ProductsApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(ProductsApiSlice.middleware), 
})

export const persister=persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppDispatch:()=>AppDispatch=useDispatch

export default store
