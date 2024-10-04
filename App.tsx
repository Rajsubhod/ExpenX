import RootLayout from '@app/RootLayout';
import {ThemeProvider, useTheme} from 'context/ThemeContext';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AuthLayout from '@app/AuthLayout';
import {AuthProvider, useAuth} from '@context/AuthContext';

function AppContent() {
  const {isDarkMode} = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const { isLoggedIn } = useAuth();

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      { isLoggedIn ? <RootLayout /> : <AuthLayout /> }
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
