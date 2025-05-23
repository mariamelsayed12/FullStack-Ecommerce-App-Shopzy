import { Flex, Skeleton, Stack } from '@chakra-ui/react';

const DashboardProductsSkeleton = () => {
    return (
    <Stack maxW={"85%"} mx={"auto"} my={10}> 
        {Array.from({ length: 8 }, (_, idx) => (
        <Flex 
            key={idx}
            alignItems={'center'}
            justifyContent={'space-between'}
            border={'1px solid gray'}
            h={'58px'}
            rounded={'md'}
            p={2}
        >
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Skeleton h={'9px'} w={'128px'} bg={'gray'} />
            <Flex>
                <Skeleton h={"30px"} w={'50px'} startColor="red.300" endColor="red.500" mr={4} />
                <Skeleton h={"30px"} w={'50px'} startColor="blue.300" endColor="blue.500" mr={4} />
</Flex>

        </Flex>
        ))}
    </Stack>
    );
};

export default DashboardProductsSkeleton;