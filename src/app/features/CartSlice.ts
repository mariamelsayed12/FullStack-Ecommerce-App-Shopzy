import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import { addItemToShoppingCart } from "../../utils";
import { createStandaloneToast } from "@chakra-ui/react";

interface IcartProduct{
    cartProducts:IProduct[]
}

const initialState:IcartProduct={
    cartProducts:[]
};

const {toast} =createStandaloneToast()



const cartSlice=createSlice({
    name:"Cart",
    initialState,
    reducers:{
        addToCartAction:(state,action:PayloadAction<IProduct>)=>{
            state.cartProducts=addItemToShoppingCart(action.payload,state.cartProducts)
        },
        removeFromCartAction: (state, action: PayloadAction<number>) => {
            state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload);
            toast({
                title: 'Removed from your card',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        },
        ClearCartAction: (state) => {
            state.cartProducts = []
                toast({
                    title: ' your Cart is empty now',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
        }
    }
})

export const {addToCartAction,removeFromCartAction,ClearCartAction}=cartSlice.actions
export default cartSlice.reducer