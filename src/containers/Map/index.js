import React, { useState, useEffect} from "react";
import RNLocation from 'react-native-location';
import MapComponent from "koraCounter/src/components/pages/Map"
import LocationDelta from 'koraCounter/src/assets/LocationDelta';

const Map = () => {
  const [initialRegion, setInitialRegion] = useState();

  useEffect(() => {
    locationRequest();
  }, []);

  const locationRequest = () => {
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then((granted) => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          setInitialRegion({
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
            latitudeDelta: LocationDelta.LATITUDE_DELTA,
            longitudeDelta: LocationDelta.LONGITUDE_DELTA,
          });
        });
      }
    });
  };

  return <MapComponent initialRegion={initialRegion} />;
}

export default Map;