import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from '../main';
import Home from '../home'

const RootNavigator = createSwitchNavigator({
  Home,
});

const Root = createAppContainer(RootNavigator);

export default Root;
