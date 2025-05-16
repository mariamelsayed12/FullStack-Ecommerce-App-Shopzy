'use client'

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react'

interface Props {
  marginTop?: number
  tags: string[]
}

const BlogTags = ({ marginTop = 0, tags }: Props) => (
  <HStack spacing={2} marginTop={marginTop}>
    {tags.map((tag) => (
      <Tag size="md" variant="solid" colorScheme="blue" key={tag}>
        {tag}
      </Tag>
    ))}
  </HStack>
)

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor = ({ date, name }: BlogAuthorProps) => (
  <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
    <Image
      borderRadius="full"
      boxSize="40px"
      src="https://100k-faces.glitch.me/random-image"
      alt={`Avatar of ${name}`}
    />
    <Text fontWeight="medium">{name}</Text>
    <Text>—</Text>
    <Text>{date.toLocaleDateString()}</Text>
  </HStack>
)

const ArticleList = () => {
  const bgColor = useColorModeValue('white', 'black')
  const cardBg = useColorModeValue('#2a2b38', '#2a2b38')
  const textTitleColor = useColorModeValue('#2a2b38', 'whiteAlpha.900')
  const textColor = useColorModeValue('white', 'whiteAlpha.900')

  return (
    <Container maxW={'7xl'} p="12" bg={bgColor}>
      <Heading as="h1" color={textTitleColor}>
        Latest Smartphone Articles
      </Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
                alt="Smartphone"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(blue.600 1px, transparent 1px)',
                'radial(blue.100 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags tags={["Smartphones", "Technology"]} />
          <Heading marginTop="1" color={textTitleColor}>
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              The Evolution of Smartphones in 2025
            </Text>
          </Heading>
          <Text as="p" marginTop="2" color={textColor} fontSize="lg">
            Discover how smartphones have transformed in 2025, offering unprecedented features and capabilities that redefine mobile technology.
          </Text>
          <BlogAuthor name="Jane Smith" date={new Date('2025-05-10T19:01:27Z')} />
        </Box>
      </Box>
      <Heading as="h2" marginTop="5" color={textTitleColor}>
        More Articles
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%" bg={cardBg} p={4} borderRadius="lg">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80'"
                  alt="Smartphone"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </Box>
            </Box>
            <BlogTags tags={["Smartphones", "Reviews"]} marginTop={3} />
            <Heading fontSize="xl" marginTop="2" color={textTitleColor}>
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Top 10 Smartphones of the Year
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2" color={textColor}>
              A comprehensive review of the top 10 smartphones that have set the benchmark in 2025.
            </Text>
            <BlogAuthor name="John Doe"  date={new Date('2025-04-20T19:01:27Z')} />
          </Box>
        </WrapItem>
      </Wrap>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2" color={textTitleColor}>About Our Blog</Heading>
        <Text as="p" fontSize="lg" color={textColor}>
          Stay updated with the latest trends, reviews, and insights in the smartphone industry. Our blog offers in-depth articles to help you make informed decisions.
        </Text>
      </VStack>
    </Container>
  )
}

export default ArticleList
