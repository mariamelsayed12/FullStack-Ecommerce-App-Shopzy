import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IshowProduct{
    id:number
}


const initialState:IshowProduct={
    id:0
};

const productIdSlice=createSlice({
    name:"IdOfProduct",
    initialState,
    reducers:{
        addId:(state,action:PayloadAction<number>)=>{
            state.id=action.payload
        }
    }
})

export const {addId}=productIdSlice.actions
export default productIdSlice.reducer