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

const StartButton = styled.TouchableOpacity`
  flex; 1;
  backgroundColor: #EE82EE	;
  padding: 20px 50px;
  borderRadius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
`;

// eslint-disable-next-line react/prop-types
const Home = ({ latitude, longitude, easting, northing, countNumber, onPressStart }) => {
  return (
    <Wrapper>
      <Title>Latitude: {latitude}</Title>
      <Title>Longitude: {longitude}</Title>
      <Title>X: {easting}</Title>
      <Title>Y: {northing}</Title>
      <Title>Total Kora: {countNumber}</Title>
      <StartButton onPress={onPressStart}>
        <ButtonText>Start The Count</ButtonText>
      </StartButton>
    </Wrapper>
  )
}
export default Home;