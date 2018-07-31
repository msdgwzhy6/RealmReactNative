import React from 'react'
import { createStackNavigator } from 'react-navigation'
import routes from './src/config/routes'

const HomeStack = createStackNavigator(
  {
    ...routes,
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
