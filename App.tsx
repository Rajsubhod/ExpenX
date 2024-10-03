import RootLayout from "@app/RootLayout";
import { ThemeProvider, useTheme } from "@components/ThemeContext";
import Welcome from "@screens/Welcome";
import Signup from "@screens/Signup";
import Login from "@screens/Login";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";


function AppContent() {
  const { isDarkMode } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* TODO: Make Authentication Context */}
      {/* { isAuthenticated ? <Welcome /> : <RootLayout /> } */}
      <Login />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})