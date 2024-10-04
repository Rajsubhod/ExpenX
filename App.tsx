import RootLayout from "@app/RootLayout";
import { ThemeProvider, useTheme } from "@components/ThemeContext";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import AuthLayout from "@app/AuthLayout";


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
      {/* { isAuthenticated ? <AuthLayout /> : <RootLayout /> } */}
      <AuthLayout />
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