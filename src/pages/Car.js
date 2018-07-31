import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Button, Modal } from 'antd-mobile-rn'
import RealmHelp from '../common/RealmHelp'

// 定义模型和它们的属性
const CarSchema = {
  name: 'Car', // Schema Name
  properties: { // Schema properties
    make: 'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  },
}

export default class Car extends Component {
  static navigationOptions = {
    headerTitle: '宝马车',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.createCar()
  }

  createCar = () => {
    RealmHelp.write({schema: [CarSchema]}, (realm) => {
      const myCar = realm.create('Car', {
        make: '宝马',
        model: 'X3',
        miles: 1000,
      })
      myCar.miles += 20
    })
  }

  queryCar = () => {
    RealmHelp.query({schema: [CarSchema]}, 'Car', 'miles > 1000').then((res) => {
      Modal.alert(`超过1000英里的车子有${res.length}辆`)
    })
  }

  render() {
    const { myCar } = this.state
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(myCar)}</Text>
        <Button
          type="primary"
          size="large"
          onClick={() => { this.queryCar() }}
        >查询
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
