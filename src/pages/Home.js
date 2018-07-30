import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
} from 'react-native'
import { List, Button } from 'antd-mobile-rn'

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
      <ScrollView style={styles.container}>
        {/* <List>
          <Item
            arrow="horizontal"
            onClick={() => this.props.navigation.navigate('Dog')}
          >
            标题文字
            <Brief>辅助文字内容</Brief>
          </Item>
        </List> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
