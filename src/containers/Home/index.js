import React, { useState, useEffect} from "react";
import RNLocation from 'react-native-location';
import HomeComponent from "koraCounter/src/components/pages/Home"

const Home = () => {
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
  return <HomeComponent initialRegion={initialRegion} />;
}

export default Home;