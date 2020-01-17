import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './screens/Home';
import Profile from './screens/Profile';

export default createAppContainer(
  createStackNavigator({
    Home,
    Profile,
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#7159c1'
      },
      headerTintColor: "#fff"
    }
  }),
);
