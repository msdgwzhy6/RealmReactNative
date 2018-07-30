import React from 'react'
import { createStackNavigator } from 'react-navigation'
import Home from './src/pages/Home'
const HomeStack = createStackNavigator(
  {
    Home
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'rgb(85, 163, 223)',
      },
      headerTintColor: 'rgb(255,255,255)',
    },
  },
)
export default () => (
  <HomeStack />
)
