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
    console.log("THis is the value of th new Position", this.center)
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
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => {
      locationRequest();
      console.log("seconds", seconds)
      setSeconds(seconds + 1);
      console.log("seconds", seconds)
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

  const lapCounter = new LapCounter(
    new Coordinate(-1.0, 0.0),
    new Coordinate(0.0, 0.0)
  );

  // clockwise rotation
  const positions = [
    new Coordinate(-1, 0),
    new Coordinate(0, -1),
    new Coordinate(1, 0),
    new Coordinate(0, 1),
  ];
  const nPosition = positions.length;
  let iPosition = 0;

  const { easting, northing } = fromLatLon(latitudeValue, longitudeValue);
  console.log("THis is the value of easting and northing", positions[iPosition % nPosition]);
  lapCounter.update(positions[iPosition = iPosition % nPosition]);
  iPosition++;

  const countNumber = 0;

  return <HomeComponent latitude={latitudeValue} longitude={longitudeValue} easting={easting} northing={northing} countNumber={countNumber}/>;
}

export default Home;