import { IProduct } from "../interfaces";
import {  createStandaloneToast } from "@chakra-ui/react";

// Define the function to accept a `toast` function as a parameter
export const addItemToShoppingCart = (carItem: IProduct,shoppingCartItems: IProduct[] = [])=> {
    const existsItem = shoppingCartItems.find(item => item.id === carItem.id);
    const {toast} =createStandaloneToast()
    
    if (existsItem) {
        toast({
            title: 'Added to your Cart',
            description: "This Item already exists, the quantity will be increased",
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        return shoppingCartItems.map(item =>
            item.id === carItem.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
    }
    toast({
        title: 'Added to your Cart',
        status: 'success',
        duration: 2000,
        isClosable: true,
    });

    return [...shoppingCartItems, { ...carItem, quantity: 1 }];
};
