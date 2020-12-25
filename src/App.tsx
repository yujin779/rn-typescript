import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  }
});

function App() {
  return (
    <View style={styles.container}>
      <Text>React Native testApp</Text>
    </View>
  );
}

export default App;