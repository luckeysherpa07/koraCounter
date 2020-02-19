import React, { useState, useEffect} from "react";
import RNLocation from 'react-native-location';
import HomeComponent from "koraCounter/src/components/pages/Home"

const Home = () => {
  const [latitudeValue, setlatitudeValue] = useState();
  const [longitudeValue, setlongitudeValue] = useState();

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
          setlatitudeValue(locations[0].latitude)
          setlongitudeValue(locations[0].longitude)
        });
      }
    });
  };
  return <HomeComponent latitude={latitudeValue} longitude={longitudeValue} />;
}

export default Home;