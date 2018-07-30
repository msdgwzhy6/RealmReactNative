import React, { Component } from 'react'
import {
  ScrollView,
} from 'react-native'
import { List } from 'antd-mobile-rn'

const Item = List.Item
const Brief = List.Item.Brief

export default class Home extends Component {
  static navigationOptions = {
    headerTitle: 'Realm React Native',
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props
    return (
      <ScrollView>
        <List>
          <Item
            arrow="horizontal"
            onClick={() => navigation.navigate('Dog')}
          >
            Realm 中有几只狗
            <Brief>Realm 第一个Demo</Brief>
          </Item>
        </List>
      </ScrollView>
    )
  }
}
