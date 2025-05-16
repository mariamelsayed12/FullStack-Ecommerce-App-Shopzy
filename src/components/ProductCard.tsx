import {  Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { addId } from '../app/features/productIdSlice';
import ButtonProduct from './UI/ButtonProduct/ButtonProduct';
interface IProduct{
    documentId:string
    title:string;
    description:string;
    price:number
    thumbnail:string
    

}


const ProductCard = ({title,description,price,thumbnail,documentId}:IProduct) => {

    // const {colorMode}=useColorMode()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const Navigatetoproduct=()=>{
        dispatch(addId(documentId))
        navigate('/DetailseOfProduct')
    }
    return ( 
    <Card  border={"1px solid  #9DCCFF"} bg={"none"}>
    <CardBody>
    <Image
        src={thumbnail}
        alt='Green double couch with wooden legs'
        borderRadius='50%'
        width="200px"
        height="200px"
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
    <ButtonProduct onClick={Navigatetoproduct}>
    View Details
    </ButtonProduct>
</Box>

    
    </CardBody>

</Card>
    )
}

export default ProductCard