import React from "react";
import {
  StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapArea = () => (
  <MapView
    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={styles.map}
    region={{
      latitude: 27.7172,
      longitude: 85.3240,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  >
  </MapView>
  )
export default MapArea;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});