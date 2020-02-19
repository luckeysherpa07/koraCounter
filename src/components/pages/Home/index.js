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

const Home = ({ initialRegion }) => (
  <Wrapper>
    <Title>Latitude: {initialRegion.latitude}</Title>
    <Title>Longitude: {initialRegion.latitude}</Title>
  </Wrapper>
  )
export default Home;
