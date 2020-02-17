import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from 'koraCounter/src/routes/home';
import Map from 'koraCounter/src/routes/map'

const Main = createBottomTabNavigator({
  Home,
  Map
}, {
  tabBarOptions: {
    style: {
      backgroundColor: "white"
    }
  }
});

export default Main;
