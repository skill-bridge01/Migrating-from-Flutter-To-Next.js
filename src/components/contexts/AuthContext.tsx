import axios from 'axios';
import React,{ createContext } from 'react';
import router from 'next/router';
const AuthContext = createContext();
export const getUser = async (ctx) => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
      headers: ctx.?req?.headers?.cookie ? { cookie: ctx.req.headers.cookie } : undefined,
      withCredentials: true,
    })
    .then((response) => {
      if (response.data) {
        return { status: 'SIGNED_IN', user: response.data };
      } else {
        return { status: 'SIGNED_OUT', user: null };
      }
    })
    .catch((error) => {
      return { status: 'SIGNED_OUT', user: null };
    });
};
export const AuthProvider = (props) => {
  const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };
  const login = async (email, password) => {
    // Use any auth service methods here
    return await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then(() => {
        router.push('/');
        console.log('user signed in');
      })
      .catch((error) => {
        console.error('Incorrect email or password entered.);
      });
  };
  const register = async (email, password) => {
    return await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
      data: { email, password },
      withCredentials: true,
    })
      .then(function (response) {
        router.push('/');
          console.log('user registered');
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };
  const logout = async () => {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, { withCredentials: true })
      .then(() => {
        router.push('/');
        console.log('user logged out');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return <AuthContext.Provider value={{ auth, logout, register, login }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;
