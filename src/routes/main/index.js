import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../home';
import Map from '../map'

const Main = createBottomTabNavigator({
  Home,
  Map
}, {
  tabBarOptions: {
    style: {
      backgroundColor: "gray"
    }
  }
});

export default Main;
