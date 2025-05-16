import {  Box, Card, CardBody, Heading, Image, Stack, Text} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../app/features/CartSlice';
import { IProduct } from '../interfaces';
import AddToCardButton from './UI/ButtonAddToCard/AddToCardButton';



interface IOneProduct{
    title:string;
    description:string;
    price:number
    thumbnail:string
    data:IProduct
    

}

const DetailsOfProduct = ({description,price,thumbnail,title,data}:IOneProduct) => {

const dispatch =useDispatch()
const AddToCardHandler=()=>{
    dispatch(addToCartAction(data))

}
    return (
<Card  border={"1px solid  #9DCCFF"} bg={"none"}>
    <CardBody>
    <Image
        src={thumbnail}
        alt='Green double couch with wooden legs'
        borderRadius='5%'
        width="280px"
        height="270px"
        mx={"auto"} // marign left and right =>hatgeb elsora fi elnos
        objectFit={"cover"}
    />
    <Stack mt='6' spacing='3'>
        <Heading size='md' textAlign={"center"}  mb={2}>{title}</Heading>
        <Text  fontSize={"sm" } textAlign={"center"}>
        {description}
        </Text>
        <Text color='purple.600' fontSize='3xl' textAlign={"center"}>
        {price}.000 EG
        </Text>
    </Stack>
    <Box display="flex" justifyContent="center" mt={4}>
        <AddToCardButton
        priceProduct={`${price}.000`}
        onClick={AddToCardHandler}
    >
        ADD TO Card
    </AddToCardButton>
    </Box>

    </CardBody>

</Card>
    )

}

export default DetailsOfProduct