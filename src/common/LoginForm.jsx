import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Input,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Link,
} from '@chakra-ui/react';

export function LoginForm() {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
    >
      <Box
        textAlign="center"
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        p={8}
      >
        <Heading pb={6}>Sign In</Heading>
        <form>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
            />
          </FormControl>

          <Stack isInline justifyContent="space-between" mt={4}>
            <Box>
              <Link color="gray.700">
                Don't have an account? Sign Up!
              </Link>
            </Box>
          </Stack>

          <Button color="blue.400" width="full" mt={4}>
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
