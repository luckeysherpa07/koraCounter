import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../containers/Home';

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
});

HomeNavigator.navigationOptions = {
  tabBarLabel: "Home"
};

export default HomeNavigator;
