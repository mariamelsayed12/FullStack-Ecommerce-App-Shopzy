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
import { ChangeEvent, FormEvent, useState } from 'react'
import { RootState, useAppDispatch } from '../app/store'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { userSignup } from '../app/features/signupSlice'

export default function SignUP() {
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({ username: "", email: "", password: "" })
    const [isEmail, setIsEmail] = useState(false)
    const [isUsername, setIsUsername] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const dispatch = useAppDispatch()
    const { loading, data } = useSelector((state: RootState) => state.signup)
    const navigate = useNavigate()

    if (data) {
    setTimeout(() => {
        navigate('/Login');
    }, 2000);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
    }

    const sumbitHandler = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!user.username && !user.password && !user.email) {
        setIsUsername(true)
        setIsEmail(true)
        setIsPassword(true)
        return
    }


    if (!user.username) {
      setIsUsername(true)
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
    setIsUsername(false)
    dispatch(userSignup(user))
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
            <Heading fontSize="4xl" color={textTitleColor}>Sign up to your account</Heading>
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
            <FormControl id="username">
                <FormLabel color={textColor}>Full Name</FormLabel>
                <Input
                type="text"
                isInvalid={isUsername}
                errorBorderColor={errorColor}
                onChange={onChangeHandler}
                value={user.username}
                name="username"
                focusBorderColor="rgb(201, 187, 252)"
                sx={{
                _hover: {
                borderColor: 'rgb(201, 187, 252)',
            },
                }}
                />
                {isUsername && (
                <FormHelperText color={errorColor}>
                    Username is required.
                </FormHelperText>
                )}
            </FormControl>
            <FormControl id="email">
                <FormLabel color={textColor}>Email</FormLabel>
                <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor={errorColor}
                onChange={onChangeHandler}
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

            <Stack spacing={5}>
              <Button
                bg={isUsername || isEmail || isPassword ? errorColor : buttonBg}
                color="#5e6681"
                _hover={{ bg: isUsername || isEmail || isPassword ? 'red.600' : buttonHover }}
                type="submit"
                isLoading={loading}
              >
                Sign up
              </Button>
              <Stack>
                <Text align="center" color={textColor}>
                  Already a user?{" "}
                  <Link as={RouterLink} to="/Login" color="rgb(201, 187, 252)">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
