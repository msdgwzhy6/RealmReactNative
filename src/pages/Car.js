import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import RealmHelp from '../common/RealmHelp'

// 定义模型和它们的属性
const CarSchema = {
  name: 'Car', // Schema Name
  properties: {
    make: 'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  },
}

export default class Car extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    RealmHelp.write([CarSchema], (realm) => {
      const myCar = realm.create('Car', {
        make: '宝马',
        model: 'X3',
        miles: 1000,
      })
      this.setState({myCar})
    })
  }

  render() {
    const { myCar } = this.state
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(myCar)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
