import { supabase } from '../config/supabaseClient';
import { useQuery } from 'react-query';
import { Box, Flex, Text } from '@chakra-ui/react';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import DetailsOfProduct from '../components/DetailsOfProduct';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CartDrawer from '../components/CartDrawer';
import GoBackButton from '../components/UI/GoBack/GoBack';



const DetailseOfProduct = () => {
  const { id } = useSelector((state: RootState) => state.IdOfProduct);
  const navigate= useNavigate()
  const getProductList = async () => {
    if (!id) throw new Error("No Product ID Provided");
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data };
  };

  const { data, isLoading } = useQuery(
    ["oneproduct", id], 
    getProductList, 
    { enabled: !!id }
  );

  const goBack=()=>{
    navigate(-1)
  }

  useEffect(()=>{
    document.title=`product ${data?.data?.attributes?.title} page`
  },[])

  if (isLoading) {
    return (
      <Box  maxW='sm' mx={'auto'} mb={20}>
        <ProductCardSkeleton />
      </Box>
    )
  }
  return (
    <>
    <CartDrawer/>
    <Flex margin={30} maxW='sm' 
      alignItems={'center'}
      mx={'auto'}
      my={7}
      fontSize={'lg'} cursor={'pointer'} 
      onClick={goBack} >
            <GoBackButton/>
      <Text ml={2}>Back</Text>
    </Flex>
    <Box maxW='sm' mx={'auto'} mb={20} >
          {data?.data ? (
        (() => {
          const product = data.data;
          const thumbnailUrl = product.thumbnail;

          return (
            <div key={product.id}>
              <DetailsOfProduct 
              data={product}
                title={product.title} 
                description={product.description} 
                price={product.price}  
                thumbnail={thumbnailUrl}
              />
            </div>
          );
        })()
      ) : (
        <p>No product yet</p>
      )}
      </Box>
    </>

  );
};

export default DetailseOfProduct;
