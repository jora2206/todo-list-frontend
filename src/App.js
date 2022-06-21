import './App.css';
import {
  ChakraProvider,
  ThemeProvider,
  theme,
  CSSReset,
} from '@chakra-ui/react';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUp } from './pages/SignUpPage/SignUp';
import { MainPage } from './pages/MainPage/MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { PrivateRoute } from './common/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <PrivateRoute path="/">
              <MainPage />
            </PrivateRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
