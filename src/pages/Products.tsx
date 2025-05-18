import ProductCard from '../components/ProductCard'
import {  Grid } from '@chakra-ui/react'
import { useQuery} from 'react-query'
import { supabase } from '../config/supabaseClient'
import ProductCardSkeleton from '../components/ProductCardSkeleton'

interface IProduct{
    id:number
    title:string;
    description:string;
    price:number
    thumbnail:string
}

const getProductList=async()=>{
    const { data, error } = await supabase
        .from('products')
        .select('*');
    if (error) throw error;
    return { data };
}

const ProductsPage = () => {
    const {data ,isLoading}=useQuery(
        "products",
        ()=>getProductList()
    )

    console.log("products data:", data);

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
        {Array.isArray(data?.data) && data.data.length ? (
            data.data.map((product: IProduct) => (
                <div key={product.id}>
                    <ProductCard {...product} />
                </div>
            ))
        ) : (
            <p>No products yet</p>
        )}
    </Grid>
    )
}

export default ProductsPage