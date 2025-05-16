
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IshowProduct{
    documentId:string
}


const initialState:IshowProduct={
    documentId:''
};

const productIdSlice=createSlice({
    name:"IdOfProduct",
    initialState,
    reducers:{
        addId:(state,action:PayloadAction<string>)=>{
            state.documentId=action.payload
        }
    }
})

export const {addId}=productIdSlice.actions
export default productIdSlice.reducer