import ProductCard from '../components/ProductCard'
import {  Grid } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import axiosInstance from '../config/axios.config'
import ProductCardSkeleton from '../components/ProductCardSkeleton'



interface IProduct{
    id:number
    documentId:string
    title:string;
    description:string;
    price:number
    thumbnail:{
        formats:{
            medium:{
                url:string
            }
        }
    }
}

const getProductList=async()=>{
    const{data }=await axiosInstance.get('/products?populate=thumbnail')
    return data
}


const ProductsPage = () => {

    const {data ,isLoading}=useQuery(
        "products",
        ()=>getProductList()
    )

    if(isLoading){
        return(
            <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px,1fr))"} gap={6}>
            {Array.from({length:20},(_,idx)=>(
                <ProductCardSkeleton key={idx}/>
            ))}
        </Grid>
        )
    } 

    return (
    <Grid margin={30} templateColumns={"repeat(auto-fill, minmax(300px,1fr))"} gap={6}>
        {data?.data.length ? (
                data.data.map((product: IProduct) => {
                    const thumbnailUrl = product.thumbnail?.formats?.medium?.url
                    return (
                        <div key={product.id}>
                            <ProductCard 
                                documentId={product.documentId}
                                title={product.title} 
                                description={product.description} 
                                price={product.price}  
                                thumbnail={thumbnailUrl}
                            />
                        </div>
                    );
                })
            ) : (
                <p>No products yet</p>
            )}
    </Grid>
)
}

export default ProductsPage