import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
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
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from '@chakra-ui/icons';
import { signUp } from '../../../../api/auth';

export function SignUpForm() {
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
    if (!values.confirm_password) {
      errors.confirm_password = 'Password is required';
    } else if (values.confirm_password.length < 4) {
      errors.confirm_password = 'Password is too short';
    }
    if (
      typeof values.password !== 'undefined' &&
      typeof values.confirm_password !== 'undefined'
    ) {
      if (values.password !== values.confirm_password) {
        errors.password = 'Passwords dont match';
        errors.confirm_password = 'Passwords dont match';
      }
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validate,
    onSubmit: (values) => {
      onSignUp(values.email, values.password);
    },
  });
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  async function onSignUp(email, password) {
    try {
      await signUp(email, password);

      // TODO: do 200 OK check if needed
      // TODO: do somth with result

      // TODO: navigate to login
      history.push('/login');
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
        <Heading pb={6}>Sign Up</Heading>

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
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter your email address"
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
                  background="white"
                  size="sm"
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

          <FormControl mt={4} isRequired>
            <FormLabel> Confirm your password</FormLabel>
            <InputGroup>
              <InputLeftElement
                children={<LockIcon color="gray.400" />}
              />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                name="confirm_password"
                id="confrim_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
              <InputRightElement width="4.5em">
                <Button
                  height="1.7rem"
                  size="sm"
                  background="white"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <ViewIcon />
                  ) : (
                    <ViewOffIcon />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.errors.confirm_password ? (
              <div style={{ color: 'red', marginTop: '10px' }}>
                {formik.errors.confirm_password}
              </div>
            ) : null}
          </FormControl>

          <Stack isInline justifyContent="space-between" mt={4}>
            <Box>
              <Link color="gray.700" href="/login">
                Already have an account? Sign In!
              </Link>
            </Box>
          </Stack>

          <Button
            color="white"
            background="blue.600"
            width="full"
            mt={4}
            type="submit"
            disabled={!formik.isValid}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
