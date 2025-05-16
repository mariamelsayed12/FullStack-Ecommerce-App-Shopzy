import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md'
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs'

export default function Contact() {
  // Theme Colors
  const bgColor = useColorModeValue('white', 'black')
  const cardBg = useColorModeValue('#2a2b38', '#2a2b38')
  const textTitleColor = useColorModeValue('#2a2b38', 'whiteAlpha.900')
  const textColor = useColorModeValue('white', 'whiteAlpha.900')
  const buttonBg = useColorModeValue('rgb(226, 218, 255)', 'rgb(226, 218, 255)')
  const buttonHover = useColorModeValue('rgb(201, 187, 252)', 'rgb(189, 171, 253)')

  return (
    <Container maxW="full" mt={0} centerContent overflow="hidden"  my={{ base: 6, md: 0 }} bg={bgColor}>
      <Flex>
        <Box
          bg={cardBg}
          color={textColor}
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading color={textTitleColor} pb={{ base: 2, md: 0 }} >Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color={textColor}>
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={textColor}
                        _hover={{ border: `2px solid ${buttonHover}` }}
                        leftIcon={<MdPhone color={buttonHover} size="20px" />}
                      >
                        +91-988888888
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={textColor}
                        _hover={{ border: `2px solid ${buttonHover}` }}
                        leftIcon={<MdEmail color={buttonHover} size="20px" />}
                      >
                        hello@abc.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={textColor}
                        _hover={{ border: `2px solid ${buttonHover}` }}
                        leftIcon={<MdLocationOn color={buttonHover} size="20px" />}
                      >
                        Karnavati, India
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: buttonHover }}
                      icon={<MdFacebook size="28px" color={textColor} />}
                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: buttonHover }}
                      icon={<BsGithub size="28px" color={textColor} />}
                    />
                    <IconButton
                      aria-label="discord"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: buttonHover }}
                      icon={<BsDiscord size="28px" color={textColor} />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg={bgColor} borderRadius="lg">
                  <Box m={8} color={textTitleColor}>
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            focusBorderColor={buttonHover}
                            _hover={{ borderColor: buttonHover }}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            size="md"
                            focusBorderColor={buttonHover}
                            _hover={{ borderColor: buttonHover }}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{ borderColor: buttonHover }}
                          focusBorderColor={buttonHover}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button
                          variant="solid"
                          bg={buttonBg}
                          color="black"
                          _hover={{ bg: buttonHover }}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}
