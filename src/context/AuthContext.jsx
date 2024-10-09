import {createContext, useEffect, useState, useContext} from 'react';
import {MMKV} from 'react-native-mmkv';
import {constants} from 'Constants';
import { PermissionsAndroid, Platform } from 'react-native';

const AuthContext = createContext();

export const storage = new MMKV();

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(
    storage.getString('accessToken') || '',
  );
  const [refreshToken, setRefreshToken] = useState(
    storage.getString('refreshToken') || '',
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(storage.getString('userId') || '');

  const setAccessTokenToAsyncStorage = accessToken => {
    storage.set('accessToken', accessToken);
    setAccessToken(accessToken);
  };

  const setRefreshTokenToAsyncStorage = refreshToken => {
    storage.set('refreshToken', refreshToken);
    setRefreshToken(refreshToken);
  };

  const setUserIdToAsyncStorage = userId => {
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

      // console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.ok) {
        const userId = await response.text(); // Read response body as text -> response.text()
        setUserIdToAsyncStorage(userId);
        return true;
      }
    } catch (error) {
      console.log('Error checking user login status:', error);
      return null;
    }
  };

  const handleRefreshToken = async () => {
    try {
      console.log(refreshToken);
      const response = await fetch(constants.REFRESH_TOKEN, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        setAccessTokenToAsyncStorage(data.access_token);
        setRefreshTokenToAsyncStorage(data.refresh_token);
      } else {
        throw new Error('Network response was not ok');
      }

      return response.ok;
    } catch (error) {
      console.log('Error refreshing token:', error);
      return null;
    }
  };

  const handleLogout = () => {
    try {
      storage.clearAll();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  useEffect(() => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    const handleLogin = async () => {
      const checkLogin = await isUserLoggedIn();
      if (checkLogin) {
        setIsLoggedIn(true);
      } else {
        const reponse = await handleRefreshToken();
        if (reponse) {
          console.log('accessToken: ', accessToken);
          console.log('refreshToken: ', refreshToken);
          setIsLoggedIn(true);
        } else {
          console.log('Login Creditionals expired! Please login again');
        }
      }
    };
    handleLogin();
  }, []);

  useEffect(() => {
    // Request SMS permission
    const requestSmsPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const grantedRead = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'SMS Permission',
              message:
                'This app needs access to your SMS messages to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (grantedRead === PermissionsAndroid.RESULTS.GRANTED) {
            // fetchSmsMessages();
          } else {
            console.log('SMS permission denied');
          }

          const grantedListen = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            {
              title: 'SMS Permission',
              message:
                'This app needs access to your SMS messages to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (grantedListen === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('SMS listen permission granted');
            // listenForIncomingSms();
          } else {
            console.log('SMS listen permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestSmsPermission();
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
