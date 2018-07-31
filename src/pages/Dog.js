import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import Realm from 'realm'
import { Button } from 'antd-mobile-rn'

export default class DogSchemaScreen extends Component {
  static navigationOptions = {
    headerTitle: 'DogSchema',
  }

  constructor(props) {
    super(props)
    this.state = {
      realm: null,
    }
  }

  componentDidMount() {
    // 定义模型和它们的属性
    const Dog = {
      name: 'Dog',
      properties: {
        name: 'string',
      },
    }
    Realm.open({
      schema: [Dog],
    }).then((realm) => {
      realm.write(() => {
        realm.create('Dog', { name: 'Rex'})
      })
      this.setState({realm}, () => {
        realm.close()
      })
    })
  }

  render() {
    const {realm} = this.state
    const info = realm ? `Realm 中狗的数量：${realm.objects('Dog').length}` : '加载中...'
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Button type="primary" size="large" onClick={() => { navigation.goBack() }}>
          {info}
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
