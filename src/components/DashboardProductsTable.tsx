import { Button, FormControl, FormLabel, Image, Input, NumberDecrementStepper,
        NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
        Table, TableCaption, TableContainer, Tbody,
        Td, Textarea, Tfoot, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import DashboardProductsSkeleton from './DashboardProductsSkeleton'
import { useDeleteDashboardProductsMutation, useGetDashboardProductListQuery, useUpdateDashboardProductsMutation } from '../app/services/Products'
import {  Pencil, Trash2 } from 'lucide-react'
import CustomAlertDialog from '../shared/AlertDialog'
import { ChangeEvent, useEffect, useState } from 'react'
import CustomeModel from '../shared/Model'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'


interface IProduct{
    id:number
    title:string
    description:string
    price:number
    stock:number
    thumbnail:string
}






const DashboardProductsTable = () => {

    const { isOnline } = useSelector((state: RootState) => state.netwok);
    const [clickedProductId,setClickedProductId]=useState<number|null>(null)
    const [productToEdit,setProductToEdit]=useState<IProduct>({
        id: 0,
        title: '',
        description: '',
        price: 0,
        stock: 0,
        thumbnail: ''
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isModelOpen, onOpen:onModelOpen, onClose:onModelClose } = useDisclosure()
    const {isLoading,data}=useGetDashboardProductListQuery()
    const [destroyProduct,{isLoading:isDestroying,isSuccess}]=useDeleteDashboardProductsMutation()
    const [updateProduct,{isLoading:isupdating,isSuccess:isUpdatingSuccess}]=useUpdateDashboardProductsMutation()
    
    
    //Handler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setProductToEdit((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };


    const onchangePriceHandler=(value:string)=>{

        setProductToEdit((prevProduct) => ({
            ...prevProduct,
            price:+value
        }));
    }

    const onchangeStockHandler=(value:string)=>{

        setProductToEdit((prevProduct) => ({
            ...prevProduct,
            stock:+value
        }));
    }

    const onsubmitHandler=()=>{
        updateProduct({ id: clickedProductId, body: {
            title: productToEdit.title,
            price: productToEdit.price,
            stock: productToEdit.stock,
            description: productToEdit.description,
            thumbnail: productToEdit.thumbnail
        }});
    }
    

    useEffect(()=>{
        if(isSuccess){
            setClickedProductId(null)
            onClose()
        }

    },[isSuccess])

    useEffect(()=>{
        if(isUpdatingSuccess){
            setClickedProductId(null)
            onModelClose()
        }

    },[isUpdatingSuccess])

    const borderColor = useColorModeValue('gray.300', 'gray.700');


    if(isLoading || !isOnline)  return <DashboardProductsSkeleton/>

    return (

<>
    <TableContainer maxW={"85%"} mx={"auto"} my={10}>
    <Table variant='simple'  >
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
    <Tr >
        <Th borderBottom="1px solid" borderColor={borderColor}>ID</Th>
        <Th borderBottom="1px solid" borderColor={borderColor}>Title</Th>
        <Th borderBottom="1px solid" borderColor={borderColor}>Thumbnail</Th>
        <Th borderBottom="1px solid" borderColor={borderColor} isNumeric>Price</Th>
        <Th borderBottom="1px solid" borderColor={borderColor} isNumeric>Stock</Th>
        <Th borderBottom="1px solid" borderColor={borderColor} >Action</Th>

    </Tr>
    </Thead>
    <Tbody>
    {data?.data.length ? (
        data.data.map((product:IProduct) => {
            const thumbnailUrl = product.thumbnail;
            
            return ( 
                <Tr key={product.id} >
                    <Td borderBottom="1px solid" borderColor={borderColor} >{product.id}</Td>
                    <Td borderBottom="1px solid" borderColor={borderColor}>{product.title}</Td>
                    <Td borderBottom="1px solid" borderColor={borderColor}>
                        <Image borderRadius={"full"} objectFit={"cover"} boxSize={'40px'} src={thumbnailUrl} alt={product.title}/>
                    </Td>
                    <Td borderBottom="1px solid" borderColor={borderColor} isNumeric>{product.price}</Td>
                    <Td borderBottom="1px solid" borderColor={borderColor} isNumeric>{product.stock}</Td>
                    <Td borderBottom="1px solid" borderColor={borderColor}>
                    <Button colorScheme='red' variant={'solid'} mr={3}
                        onClick={()=>{
                            setClickedProductId(product.id)
                            onOpen()
                    }} >
                        <Trash2 size={17}/>
                    </Button>
                    <Button colorScheme='blue' variant={'solid'} 
                        onClick={()=>{
                            setClickedProductId(product.id)
                            setProductToEdit(product)
                            onModelOpen()
                        }
                            }> 
                    <Pencil size={17}/>
                    </Button>
                    </Td>
                </Tr>
            );
        })
    ) : (
        <Tr>
            <Td colSpan={6} textAlign="center">No products yet</Td>
        </Tr>
    )}
    
</Tbody>

    <Tfoot>
    <Tr>
        <Th>ID</Th>
        <Th>Title</Th>
        <Th>Thumbnail</Th>
        <Th isNumeric>Price</Th>
        <Th isNumeric>Stock</Th>
        <Th >Action</Th>

    </Tr>
    </Tfoot>
</Table>
    </TableContainer>
    <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose} 
        title='Are you sure?'
        description={'Do you want destory this product?'}
        cancelText='Cancel'
        okText='Destroy'
        isloading={isDestroying}
        onOkHandler={()=>destroyProduct(clickedProductId)}
        />

        <CustomeModel
        isOpen={isModelOpen}
        onClose={onModelClose}
        title='Update Product'
        okText='Update'
        CancelText='Cancel'
        onOkClick={onsubmitHandler}
        isloading={isupdating}
        >

            <FormControl my={3} >
            <FormLabel>Title</FormLabel>
            <Input   placeholder='Product Title' name='title' value={productToEdit?.title} onChange={onChangeHandler} />
            <FormLabel mt={2}>Description</FormLabel>
            <Textarea   placeholder='description' name='description' value={productToEdit?.description} onChange={onChangeHandler} />
            <FormLabel mt={2}>Price</FormLabel>
            <NumberInput name='price' defaultValue={productToEdit?.price} onChange={onchangePriceHandler} precision={2} step={0.2} >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
            <FormLabel mt={2}>Count in Stock</FormLabel>
            <NumberInput
                name='stock'
                defaultValue={productToEdit?.stock}
                onChange={onchangeStockHandler}
                precision={2}
                step={0.2}
            >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
            </NumberInput>
            <FormLabel mt={2}>Thumbnail</FormLabel>
            <Input 
                id='thumbnail'
                h={'full'}
                placeholder='Choose File'
                accept='image/png, image/gif, image/jpeg'
                p={2} 
                type='file' 
            />
            </FormControl>

    </CustomeModel>
</>

    )
}

export default DashboardProductsTable