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

const Home = ({ latitude, longitude }) => (
  <Wrapper>
    <Title>Latitude: {latitude}</Title>
    <Title>Longitude: {longitude}</Title>
  </Wrapper>
  )
export default Home;
