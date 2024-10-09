import {createContext, useEffect, useState, useContext} from 'react';
import {MMKV} from 'react-native-mmkv';
import { constants } from 'Constants';

const AuthContext = createContext();

export const storage = new MMKV()

export const AuthProvider = ({children}) => { 
  
  const [accessToken, setAccessToken] = useState(storage.getString('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(storage.getString('refreshToken') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState(storage.getString('userId') || '');

  const setAccessTokenToAsyncStorage = (accessToken) => {
    storage.set('accessToken', accessToken);
    setAccessToken(accessToken);
  };

  const setRefreshTokenToAsyncStorage = (refreshToken) => {
    storage.set('refreshToken', refreshToken);
    setRefreshToken(refreshToken);
  };

  const setUserIdToAsyncStorage = (userId) => {
    storage.set('userId', userId);
    setUserId(userId);
  };

  const isUserLoggedIn = async () => {
    try {
      const response = await fetch(constants.PING, {
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

      if(response.ok){
        const data = await response.json();
        setUserIdToAsyncStorage(data.userId);
        return true;
      }
    } catch (error) {
      console.log('Error checking user login status:', error);
      return null;
    }
  };

  const handleRefreshToken = async () => {
    try{
      const response = await fetch(constants.REFRESH_TOKEN,{
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
      console.log('Error refreshing token:', error);
      return null;
    }
  };

  const handleLogout = () => {
    try{
      storage.clearAll();
      setIsLoggedIn(false);
    }
    catch(error){
      console.log('Error logging out:', error);
    }
  }

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
          console.log('Login Creditionals expired! Please login again');
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
        userId,
        setUserIdToAsyncStorage,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
