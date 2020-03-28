import React, { useState, useEffect } from "react";
import RNLocation from 'react-native-location';
import HomeComponent from "koraCounter/src/components/pages/Home"
import { fromLatLon } from 'utm';

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  negative() {
    return new Coordinate(-this.x, -this.y);
  }

  add(otherCoordinate) {
    return new Coordinate(this.x + otherCoordinate.x, this.y + otherCoordinate.y);
  }

  multiply(scalar) {
    return new Coordinate(this.x * scalar, this.y * scalar);
  }

  distanceFrom(otherCoordinate) {
    return Math.sqrt(Math.pow(otherCoordinate.x - this.x, 2) + Math.pow(otherCoordinate.y - this.y, 2));
  }

  measureAngle(center, otherCoordinate) {
    // uses the cosine law for angle calculation
    // a b c are the sides of the triangle opposite to the angles A, B, C resp.
    // calculating for angle A here 
    const a = this.distanceFrom(otherCoordinate);
    const b = this.distanceFrom(center);
    const c = center.distanceFrom(otherCoordinate);
    return Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180 / Math.PI;
  }

  // returns if this equals another coordinate using tolerance
  equals(otherCoordinate, tolerance) {
    return (Math.abs(this.x - otherCoordinate.x) <= tolerance) && (Math.abs(this.y - otherCoordinate.y) <= tolerance);
  }

  // measures the slope of line connecting this point and other point
  // returns the slope
  getSlopeWith(otherCoordinate) {
    return Math.atan((otherCoordinate.y - this.y) / (otherCoordinate.x - this.x));
  }

  getVectorFrom(otherCoordinate) {
    return this.add(otherCoordinate.negative());
  }

  unitVectorFrom(otherCoordinate) {
    const vector = this.getVectorFrom(otherCoordinate);
    const magnitude = this.distanceFrom(otherCoordinate);
    return vector.multiply(1 / magnitude);
  }

  // returns the coordinate rotated by the angle using the center
  // in clockwise direction for +ve angle
  getRotated(center, angle) {
    const angle_radian = -angle * Math.PI / 180;
    // translating to center
    const dx = this.x - center.x;
    const dy = this.y - center.y;
    // calculating cos and sin angles
    const cosTheta = Math.cos(angle_radian);
    const sinTheta = Math.sin(angle_radian);
    // rotating and transtating back to the center and returning the final coordinate
    return new Coordinate(
      (dx * cosTheta - dy * sinTheta) + center.x,
      (dx * sinTheta + dy * cosTheta) + center.y
    );
  }
}

class LapCounter {
  constructor(startPosition, center) {
    this.startPosition = startPosition;
    this.center = center;
    this.currPosition = startPosition;
    this.sumOfAngles = 0;
    this.nLaps = 0;

    this.update = this.update.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  angleIsClockwise(newPos, angle) {
    // debugger;
    const rotated = this.currPosition.getRotated(this.center, -angle) // -ve angle for clockwise rotation
    return newPos.unitVectorFrom(this.center).equals(rotated.unitVectorFrom(this.center), 0.001);
  }

  update(newPos) {
    const angle = this.currPosition.measureAngle(this.center, newPos);
    console.log("Start Postiion", this.startPosition)
    console.log("Center", this.center)
    if (this.angleIsClockwise(newPos, angle)) {
      this.sumOfAngles += angle;
    }
    else {
      this.sumOfAngles -= angle;
    }
    this.currPosition = newPos;
    if (this.sumOfAngles >= 360) {
      this.nLaps++;
      // reseting the sumOfAngles and currPosition
      this.sumOfAngles = 0;
      this.currPosition = this.startPosition;
    }
    else if (this.sumOfAngles <= -360) // added the condition for anticlockwise rotation too
    {
      this.nLaps--;
      // reseting the sumOfAngles and currPosition
      this.sumOfAngles = 0;
      this.currPosition = this.startPosition;
    }
  }

  getCount() {
    return this.nLaps;
  }
}

const Home = () => {
  const [latitudeValue, setlatitudeValue] = useState();
  const [longitudeValue, setlongitudeValue] = useState();
  const [initialNorthing, setInitialNorthing] = useState();
  const [initialEasting, setInitialEasting] = useState();
  const [koraNumber, setKoraNumber] = useState();

  useEffect(() => {
    locationRequest();
    // initialLocationRequest();
  }, []);

  const lapCounter = new LapCounter(
    new Coordinate(initialEasting, initialNorthing), //initial co-ordinate of user (One side)
    new Coordinate(338524.14, 3067417.25) // center co-ordinate of Boudha
  );

  // clockwise rotation
  //Four demo position which is in four side of Boudha
  const positions = [
    new Coordinate(338530.80, 3067480.33),
    new Coordinate(338467.59, 3067421.22),
    new Coordinate(338519.70, 3067365.23),
    new Coordinate(338580.77, 3067418.61),
  ];

  const nPosition = positions.length;
  let iPosition = 0;

  const initiateInterval = () => {
    setInterval(refreshCounter, 3000);
  }

  const refreshCounter = () => {
    console.log("Current Position", positions[iPosition % nPosition]);
    // locationRequest();
    lapCounter.update(positions[iPosition = iPosition % nPosition]);
    iPosition++;
    setKoraNumber(lapCounter.getCount())
    console.log("Count", lapCounter.getCount())
  }

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
          const { easting, northing } = fromLatLon(locations[0].latitude, locations[0].longitude);
          setlatitudeValue(locations[0].latitude)
          setlongitudeValue(locations[0].longitude)
          setInitialEasting(easting);
          setInitialNorthing(northing);
        });
      }
    });
  };

  // const initialLocationRequest = () => {
  //   setInitialEasting(easting);
  //   setInitialNorthing(northing);
  //   console.log("Inital Easting and Northing", easting, northing)
  // };

  const onPressStart = () => {
    // initialLocationRequest();
    initiateInterval();
  }

  return <HomeComponent
    latitude={latitudeValue}
    longitude={longitudeValue}
    // easting={easting}
    // northing={northing}
    countNumber={koraNumber}
    onPressStart={onPressStart}
  />;
}

export default Home;