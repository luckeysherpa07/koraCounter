import React, { useState, useEffect} from "react";
import RNLocation from 'react-native-location';
import MapComponent from "koraCounter/src/components/pages/Map"

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
          });
        });
      }
    });
  };

  return <MapComponent initialRegion={initialRegion} />;
}

export default Map;