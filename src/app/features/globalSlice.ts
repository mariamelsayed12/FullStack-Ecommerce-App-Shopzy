import {  createSlice } from "@reduxjs/toolkit";



const initialState={
    isOpenCardDrawer:false,
    onOpenCardDrawer:false,
    onCloseCardDrawer:false
};

const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        onOpenCardDrawerAction:(state)=>{
            state.onOpenCardDrawer=true
            state.isOpenCardDrawer=true
        },
        onCloseCardDrawerAction:(state)=>{
            state.onOpenCardDrawer=false
            state.isOpenCardDrawer=false
        },
    }
})
export const {onCloseCardDrawerAction,onOpenCardDrawerAction}=globalSlice.actions
export default globalSlice.reducer