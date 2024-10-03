import RootLayout from "@app/RootLayout";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} barStyle="dark-content" />
      <RootLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})