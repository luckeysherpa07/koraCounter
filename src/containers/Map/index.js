import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

const Map = () => (
  <View style={styles.container}>
    <Text>Map</Text>
  </View>
  )
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});