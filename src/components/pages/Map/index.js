import React from "react";
import styled from 'styled-components';
import MapArea from "koraCounter/src/components/organisms/Map/MapArea";

const Wrapper = styled.View`
  flex: 1
  alignItems: center
  justifyContent: center
`

const Map = () => (
  <Wrapper>
    <MapArea />
  </Wrapper>
)
export default Map;
