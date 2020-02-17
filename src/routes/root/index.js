import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from '../main';

const RootNavigator = createSwitchNavigator({
  Main,
});

const Root = createAppContainer(RootNavigator);

export default Root;
