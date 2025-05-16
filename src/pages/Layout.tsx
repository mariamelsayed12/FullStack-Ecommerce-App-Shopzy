import { Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Box } from '@chakra-ui/react'

const RoutLayout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
    <Navbar />
    
    <Box flex="1">
      <Outlet />
    </Box>
  
    <Footer />
  </Box>
  

  )
}

export default RoutLayout