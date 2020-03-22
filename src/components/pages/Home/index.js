import React from "react";
import styled from 'styled-components';

const Title = styled.Text`
  fontSize: 20
`;

const Wrapper = styled.View`
  flex: 1
  justifyContent: center
  alignItems: center
`

// eslint-disable-next-line react/prop-types
const Home = ({ latitude, longitude, easting, northing, countNumber }) => {
  return (
    <Wrapper>
      <Title>Latitude: {latitude}</Title>
      <Title>Longitude: {longitude}</Title>
      <Title>X: {easting}</Title>
      <Title>Y: {northing}</Title>
      <Title>Total Kora: {countNumber}</Title>
    </Wrapper>
  )
}
export default Home;