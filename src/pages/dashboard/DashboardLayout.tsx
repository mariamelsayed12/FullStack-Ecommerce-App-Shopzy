
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react'
import {Link as RouterLink } from 'react-router-dom'
import {
  FiHome,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Outlet } from 'react-router-dom'
import CookiesService from '../../services/CookiesService'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import Logo1 from "@/assets/logoWithBackground.png";



interface LinkItemProps {
  to:string,
  name: string
  icon: IconType
}

interface NavItemProps extends FlexProps {
to:string,
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const logOutHandler = () => {
  CookiesService.remove('jwt')
  localStorage.removeItem('loggedInAdmin')
  window.location.reload()
}

const LinkItems: Array<LinkItemProps> = [
    {to:"/dashboard/dashboardproducts",name:"Products",icon:FiMenu},
    {to:"/products",name:"User Wbsite",icon:FiHome},
]


const emailUser=localStorage.getItem('loggedInAdmin')

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
    <Box
        transition="3s ease"
        bg={useColorModeValue('white', '#2a2b38')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="5"  my="7" justifyContent="space-between">
    

      <RouterLink to="/Products">
                                <Image
                                    src={Logo1}
                                    alt="Logo"
                                    width="full"
                                    height="80px"
                                    rounded="5%"
                                />
                            </RouterLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
        </NavItem>
        ))}
    </Box>
    )
}

const NavItem = ({ to,icon, children, ...rest }: NavItemProps) => {
    return (
    <Box
        as={RouterLink}
        to={to}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
            bg: '#D2C8E3',
            color: 'black',
        }}
        {...rest}>
        {icon && (
            <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
                color: 'black',
            }}
            as={icon}
            />
        )}
        {children}
        </Flex>
    </Box>
    )
}



const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
    <Flex
    ml={{ base: 0, md: 60 }}
    px={{ base: 4, md: 4 }}
    height="20"
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
    justifyContent={{ base: 'space-between', md: 'flex-end' }}
    {...rest}>
    <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
    />

    
    <HStack spacing={{ base: '0', md: '6' }}>
                                <ThemeToggle />
        <Flex alignItems={'center'}>
            <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                <HStack>
                <Avatar
                    size={'sm'}
                    src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{emailUser}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}   bg={useColorModeValue('red.500', 'red.600')}
              >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const DashboardLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'black')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        >
        <DrawerContent >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet/>
      </Box>
    </Box>
  )
}

export default DashboardLayout