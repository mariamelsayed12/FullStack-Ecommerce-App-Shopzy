import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useColorModeValue} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../app/store';
import { onCloseCardDrawerAction} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { ClearCartAction } from "../app/features/CartSlice";


const CartDrawer = () => {

    const {isOpenCardDrawer } = useSelector((state: RootState) => state.global);
    const {cartProducts } = useSelector((state: RootState) => state.Cart);
    const bgColor = useColorModeValue("white", "#2a2b38");

    const dispatch =useDispatch()

    const onclose=()=>{
        dispatch(onCloseCardDrawerAction())
    }
    
    return (
        <Drawer
        isOpen={isOpenCardDrawer}
        placement='right'
        onClose={onclose}
        >
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
            <DrawerCloseButton />
            <DrawerHeader>Your Shoping Cart</DrawerHeader>

        <DrawerBody>
    {
    cartProducts.length?
    (
        cartProducts.map((item) => {
            const thumbnailUrl = item.thumbnail?.formats?.medium?.url
            return (
                <div key={item.id}>
                <CartDrawerItem key={item.id} price={item.price} id={item.id} quantity={item.quantity} thumbnail={thumbnailUrl} title={item.title} />
                </div>
            );
            }) 
    ):(
        <Text  fontSize={"lg"}>
        Your Cart is Empty
        </Text>
        )
    }

        </DrawerBody>
        <DrawerFooter>
            <Button variant='outline' colorScheme="red" mr={3} onClick={()=>dispatch(ClearCartAction())}>
                Clear All
            </Button>
        </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}

export default CartDrawer