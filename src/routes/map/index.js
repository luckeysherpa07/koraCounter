import { createStackNavigator } from 'react-navigation-stack';
import Map from 'koraCounter/src/containers/Map';

const MapNavigator = createStackNavigator({
  Map: {
    screen: Map
  }
});

MapNavigator.navigationOptions = {
  tabBarLabel: "Map"
};

export default MapNavigator;
