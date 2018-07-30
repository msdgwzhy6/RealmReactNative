import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Realm React Native',
    headerStyle: {
      backgroundColor: 'rgb(85, 163, 223)',
    },
    headerTintColor: 'rgb(255,255,255)',
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text>I am the Home component</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
