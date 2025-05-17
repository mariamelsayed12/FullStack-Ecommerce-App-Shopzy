
import {
  Box,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import IconsOfSocial from '../components/Icons/IconsOfSocial'
import {Link  as RouterLink} from 'react-router-dom'
import Logo from "@/assets/logo.png";



<RouterLink to="/Products">
<Image
    src="src/assets/logo.png"
    alt="Logo"
    width="100px"
    height="100px"
/>
</RouterLink>



export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('rgb(215, 205, 252)', '#D2C8E3')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
            {/* Logo */}
                              <RouterLink to="/Products">
                                  <Image
                                      src={Logo}
                                      alt="Logo"
                                      width="80px"
                                      height="70px"
                                  />
                              </RouterLink>
        <Stack textColor={'black'} direction={'row'} spacing={6}>
          <Box as="a" href={'/products'}>
            Home
          </Box>
          <Box as="a" href={'/blog'}>
            Blog
          </Box>
          <Box as={RouterLink} to='/contectus'>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text  textColor={'black'}>© 2025 Templates. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <IconsOfSocial/>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}