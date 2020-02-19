import React from "react";
import {
  StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapArea = ({ initialRegion }) => (
  <MapView
    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={styles.map}
    initialRegion={initialRegion}
  >
  </MapView>
)
export default MapArea;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});