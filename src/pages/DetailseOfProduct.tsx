import axiosInstance from '../config/axios.config';
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
  const { documentId } = useSelector((state: RootState) => state.IdOfProduct);
  const navigate= useNavigate()
  const getProductList = async () => {

    if (!documentId) throw new Error("No Product ID Provided");
    const { data } = await axiosInstance.get(`/products/${documentId}?populate=thumbnail`);
    return data;
  };

  const { data, isLoading } = useQuery(
    ["oneproduct", documentId], 
    getProductList, 
    { enabled: !!documentId }
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
          const thumbnailUrl = product.thumbnail?.formats?.medium?.url

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
