import { Button, Card, CardBody, Divider, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { removeFromCartAction } from "../app/features/CartSlice"

interface IProps{
        id:number,
        title:string,
        price:number,
        thumbnail:string,
        quantity?:number
}


const CartDrawerItem = ({id,price,quantity,title,thumbnail}:IProps) => {
    const dispatch=useDispatch()
    const buttonColor = useColorModeValue("red.600", "red.500"); 

    return (

        <>
        <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        mb={3}
        py={2}
        alignItems={"center"}
        bg="white"
        px={3}
        >
        <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={thumbnail}
            alt={title}
            w={"90px"}
            h={"90px"}
            rounded={"full"}
            mr={5}
            shadow={'lg'}
        />
        <Stack>
        <CardBody>
        <Text color={'black'} size='md'>{title}</Text>
        <Text color={'black'} size='md'>price:{price}</Text>
            <Text color={'black'} py='2'>
                Quantity:{quantity}
            </Text>
            <Button
                variant="outline"
                color={buttonColor}
                borderColor={buttonColor}
                maxW="sm"
                textColor={buttonColor}
                onClick={() => dispatch(removeFromCartAction(id))}
            >
            Remove
            </Button>
        </CardBody>
        </Stack>
        </Card>
        <Divider/>
        </>
    )
}

export default CartDrawerItem