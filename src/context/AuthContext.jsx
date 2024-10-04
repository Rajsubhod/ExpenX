import {createContext, useEffect, useState, useContext} from 'react';
import {MMKV} from 'react-native-mmkv';

const AuthContext = createContext();

export const storage = new MMKV()

export const AuthProvider = ({children}) => { 
  
  const [accessToken, setAccessToken] = useState(storage.getString('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(storage.getString('refreshToken') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setAccessTokenToAsyncStorage = (accessToken) => {
    storage.set('accessToken', accessToken);
    setAccessToken(accessToken);
  };

  const setRefreshTokenToAsyncStorage = (refreshToken) => {
    storage.set('refreshToken', refreshToken);
    setRefreshToken(refreshToken);
  };

  const isUserLoggedIn = async () => {
    try {
      const response = await fetch('http://192.168.0.105:8080/auth/v1/ping', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.ok) {
        // throw new Error('Network response was not ok');
      }

      return response.ok;
    } catch (error) {
      console.error('Error checking user login status:', error);
      return null;
    }
  };

  const handleRefreshToken = async () => {
    try{
      const response = await fetch('http://192.168.0.105:8080/auth/v1/refreshtoken',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      })

      if(response.ok){
        const data = await response.json();
        setAccessTokenToAsyncStorage(data.accessToken);
        setRefreshTokenToAsyncStorage(data.refreshToken);
      }
      else{
        throw new Error('Network response was not ok');
      }
      
      return response.ok;
    }
    catch(error){
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      const checkLogin = await isUserLoggedIn();
      if (checkLogin) {
        setIsLoggedIn(true);
      } else {
        const reponse = await handleRefreshToken();
        if(reponse){
          console.log('accessToken: ', accessToken);
          console.log('refreshToken: ', refreshToken);
          setIsLoggedIn(true);
        }
        else{
          console.error('Login Creditionals expired! Please login again');
        }
      }
    };
    handleLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessTokenToAsyncStorage,
        refreshToken,
        setRefreshTokenToAsyncStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
