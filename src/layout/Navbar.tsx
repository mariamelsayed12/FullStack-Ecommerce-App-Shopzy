import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    HStack,
    Link,
    Image,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    VStack,
    Center,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import CookiesService from '../services/CookiesService'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { onOpenCardDrawerAction } from '../app/features/globalSlice'
import LoginAndRegesterButton from '../components/UI/ButtonLoginAndRegester/LoginAndRegesterButton'
import ThemeToggle from '../components/ThemeToggle/ThemeToggle'
import { ShoppingCart, Menu as MenuIcon, X, LogOut } from 'lucide-react'
import CartDrawer from '../components/CartDrawer'
import Logo from "@/assets/logo.png";




export default function Navbar() {
    const dispatch = useDispatch()
    const token = CookiesService.get('jwt')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cartOpen = () => dispatch(onOpenCardDrawerAction())
    const { cartProducts } = useSelector((state: RootState) => state.Cart)

    const bg = useColorModeValue('rgb(215, 205, 252)', '#D2C8E3')
    const bgMenu = useColorModeValue('white', 'white')
    const buttonBg = useColorModeValue('red.600', 'red.500')
    const buttonHover = useColorModeValue('gray.700', 'gray.500')

    const logOutHandler = () => {
        CookiesService.remove('jwt')
        localStorage.removeItem('loggedInAdmin')
        window.location.reload()
    }

    const adminEmail = (localStorage.getItem('loggedInAdmin') || '').trim().toLowerCase()
    const isAdmin = adminEmail === 'test@gmail.com'

    const renderAuthButtons = () =>
        token ? (
            <Menu>
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                    <Avatar size="sm" src="https://www.svgrepo.com/show/493144/user-circle-alt.svg" />
                </MenuButton>
                <MenuList bg={bgMenu} alignItems="center">
                    <Center mt={2}>
                        <Avatar size="md" src="https://www.svgrepo.com/show/493144/user-circle-alt.svg" />
                    </Center>
                    <MenuDivider />
                    <MenuItem textColor="black" bg={buttonBg} px={2} onClick={logOutHandler} gap={2}>
                        <LogOut size={16} /> Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        ) : (
            <HStack spacing={4}>
                <LoginAndRegesterButton>
                    <Link as={RouterLink} to="/login">
                        Login
                    </Link>
                </LoginAndRegesterButton>
                <LoginAndRegesterButton>
                    <Link as={RouterLink} to="/signuP">
                        SignUP
                    </Link>
                </LoginAndRegesterButton>
            </HStack>
        )

    return (
        <>
            <Box bg={bg} roundedBottom="3xl" px={4}>
                <Flex h={20} px={5} alignItems="center" justifyContent="space-between">
                    {/* Logo */}
                    <Flex alignItems="center"  gap={10} px={5}>
                    <RouterLink to="/Products">
                        <Image
                            src={Logo}
                            alt="Logo"
                            boxSize={{ base: '70px', md: '100px' }}
                            mx={{ base: 'auto', md: '0' }}
                        />
                    </RouterLink>
                    {isAdmin && (
                            <Flex gap={5} display={{ base: 'none', md: 'flex' }}>
                                <Link as={RouterLink} to="/products" fontWeight="bold" color="#2a2b38" fontSize="xl">
                                    Products
                                </Link>
                                <Link as={RouterLink} to="/dashboard" fontWeight="bold" color="#2a2b38" fontSize="xl">
                                    Dashboard
                                </Link>
                            </Flex>
                        )}
                    </Flex>

                    {/* Desktop Menu */}
                    <Flex alignItems="center" gap={3} display={{ base: 'none', md: 'flex' }}>
                    
                        <ThemeToggle />
                        <Button onClick={cartOpen} color="black" gap={1}>
                            <ShoppingCart /> ({cartProducts.length})
                        </Button>
                        {renderAuthButtons()}
                    </Flex>

                    {/* Mobile Menu Button */}
                    <IconButton
                        aria-label="Open menu"
                        icon={<MenuIcon />}
                        variant="ghost"
                        color="#2a2b38"
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onOpen}
                    />
                </Flex>
            </Box>

            {/* Mobile Drawer */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg={bg}>
                    <DrawerHeader display="flex" justifyContent="space-between" alignItems="center" color={"#2a2b38"}>
                        Menu
                        <IconButton icon={<X />} color={"#2a2b38"} aria-label="Close" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack align="start" spacing={4} width="100%">
                            {isAdmin && (
                                <Flex justifyContent={"space-around"} alignItems={"center"} w={"full"}>
                                    <Link as={RouterLink} to="/products" onClick={onClose} fontWeight="bold" color={"#2a2b38"}>
                                        Products
                                    </Link>
                                    <Link as={RouterLink} to="/dashboard" onClick={onClose} fontWeight="bold" color={"#2a2b38"}>
                                        Dashboard
                                    </Link>
                                </Flex>
                            )}
                            <ThemeToggle />
                            <Button
                                onClick={cartOpen}
                                colorScheme="blackAlpha"
                                width="100%"
                                leftIcon={<ShoppingCart />}
                            >
                                Cart ({cartProducts.length})
                            </Button>
                            {token ? (
                                <Button
                                    bg={buttonBg}
                                    _hover={{ bg: buttonHover }}
                                    variant="ghost"
                                    leftIcon={<LogOut size={16} />}
                                    onClick={logOutHandler}
                                    width="100%"
                                >
                                    Logout
                                </Button>
                            ) : (
                                <VStack align="start" spacing={3} width="100%">
                                    <LoginAndRegesterButton>
                                        <Link as={RouterLink} to="/login" onClick={onClose} width="100%">
                                            Login
                                        </Link>
                                    </LoginAndRegesterButton>
                                    <LoginAndRegesterButton>
                                        <Link as={RouterLink} to="/signuP" onClick={onClose} width="100%">
                                            SignUP
                                        </Link>
                                    </LoginAndRegesterButton>
                                </VStack>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Cart Drawer */}
            {token && <CartDrawer />}
        </>
    )
}
