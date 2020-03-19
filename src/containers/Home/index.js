import React, { useState, useEffect} from "react";
import RNLocation from 'react-native-location';
import HomeComponent from "koraCounter/src/components/pages/Home"

const Home = () => {
  const [latitudeValue, setlatitudeValue] = useState();
  const [longitudeValue, setlongitudeValue] = useState();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval( () => 
    {
      locationRequest();
      console.log( "seconds", seconds )
      setSeconds( seconds + 1 );
      console.log( "seconds", seconds )
    }, 1000);
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
          // console.log("this is the fucking loctaion", locations[0]);
          setlatitudeValue(locations[0].latitude)
          setlongitudeValue(locations[0].longitude)
        });
    }
    });
  };
  
  return <HomeComponent latitude={latitudeValue} longitude={longitudeValue} seconds={seconds}/>;
}

export default Home;