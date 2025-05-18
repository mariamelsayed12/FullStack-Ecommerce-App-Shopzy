import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Link,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { userlogin } from '../app/features/loginSlice'
import { RootState, useAppDispatch } from '../app/store'
import { useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

interface IProps {
  isAuthenticated: boolean;
}

export default function Login({ isAuthenticated }: IProps) {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { loading } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products')
    }
  }, [isAuthenticated, navigate])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const sumbitHandler = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!user.email && !user.password) {
      setIsEmail(true)
      setIsPassword(true)
      return
    }
    if (!user.email) {
      setIsEmail(true)
      return
    }
    if (!user.password) {
      setIsPassword(true)
      return
    }

    setIsEmail(false)
    setIsPassword(false)
    dispatch(userlogin(user))
  }

  // Theme colors
  const bgColor = useColorModeValue('white', 'black')
  const cardBg = useColorModeValue('#2a2b38', '#2a2b38')
  const textTitleColor = useColorModeValue('#2a2b38', 'whiteAlpha.900')
  const textColor = useColorModeValue('white', 'whiteAlpha.900')
  const buttonBg = useColorModeValue('rgb(226, 218, 255)', 'rgb(226, 218, 255)')
  const buttonHover = useColorModeValue('rgb(201, 187, 252)', 'rgb(201, 187, 252)')
  const errorColor = 'crimson'

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
            <Heading fontSize="4xl" color={textTitleColor}>
            Sign in to your account
            </Heading>
        </Stack>
        <Box
            as="form"
            rounded="lg"
            bg={cardBg}
            boxShadow="lg"
            p={8}
            onSubmit={sumbitHandler}
        >
            <Stack spacing={4}>
            <FormControl id="email">
                <FormLabel color={textColor}>Email address</FormLabel>
                <Input
                type="email"
                isInvalid={isEmail}
                onChange={onChangeHandler}
                errorBorderColor={errorColor}
                value={user.email}
                name="email"
                focusBorderColor="rgb(201, 187, 252)"
                sx={{
                _hover: {
                borderColor: 'rgb(201, 187, 252)',
            },
        }}
            />
            {isEmail && (
                <FormHelperText color={errorColor}>
                    Email is required.
                </FormHelperText>
                )}
            </FormControl>

            <FormControl id="password">
                <FormLabel color={textColor}>Password</FormLabel>
                <InputGroup>
                <Input
                    type={showPassword ? 'text' : 'password'}
                    isInvalid={isPassword}
                    value={user.password}
                    onChange={onChangeHandler}
                    name="password"
                    errorBorderColor={errorColor}
                    focusBorderColor="rgb(201, 187, 252)"
                    sx={{
                    _hover: {
                    borderColor: 'rgb(201, 187, 252)',
                },  
                }}
                />
                <InputRightElement h="full">
                    <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
                </InputGroup>
                {isPassword && (
                <FormHelperText color={errorColor}>
                    Password is required.
                </FormHelperText>
                )}
            </FormControl>
            <Stack spacing={6}>
                <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
                >
                <Text color="white" cursor="pointer">
                    Not have an account?{' '}
                    <Link as={RouterLink} to="/signup" color="rgb(201, 187, 252)">
                    Sign up
                    </Link>
                </Text>
                </Stack>
                <Button
                bg={isEmail || isPassword ? errorColor : buttonBg}
                color="black"
                _hover={{
                    bg: isEmail || isPassword ? 'red.600' : buttonHover,
                }}
                type="submit"
                isLoading={loading}
                >
                    Sign in
                </Button>
            </Stack>
            </Stack>
        </Box>
        </Stack>
    </Flex>
    )
}
