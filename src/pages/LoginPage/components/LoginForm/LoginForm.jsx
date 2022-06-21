import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
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
  InputRightElement,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  Icon,
} from '@chakra-ui/icons';
import { BsPeopleCircle } from 'react-icons/bs';
import { login } from '../../../../api/auth';

export function LoginForm() {
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid Email';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password is too short';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      onLogin(values.email, values.password);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  async function onLogin(email, password) {
    try {
      const accessToken = window.btoa(`${email}:${password}`);
      // TODO: do 200 OK check if needed
      // TODO: do somth with result
      localStorage.setItem('accessToken', accessToken);
      history.push('/');
      // TODO: navigate to login
    } catch (error) {
      console.error(error);
    }
  }
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
        <Icon as={BsPeopleCircle} w={10} h={10} color="blue.500" />
        <Heading pt={3} pb={6}>
          Sign In
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputLeftElement
                children={<EmailIcon color="gray.400" />}
              />
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </InputGroup>
            {formik.errors.email ? (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {formik.errors.email}
              </div>
            ) : null}
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                children={<LockIcon color="gray.400" />}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <InputRightElement width="4.5em">
                <Button
                  height="1.7rem"
                  size="sm"
                  background="white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.errors.password ? (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {formik.errors.password}
              </div>
            ) : null}
          </FormControl>

          <Stack isInline justifyContent="space-between" mt={4}>
            <Box>
              <Link color="gray.700" href="/sign-up">
                Don't have an account? Sign Up!
              </Link>
            </Box>
          </Stack>

          <Button
            color="white"
            width="full"
            background="blue.600"
            mt={4}
            type="submit"
            disabled={!formik.isValid}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
