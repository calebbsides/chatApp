import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={30}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.appPalette1 : Colors.appPalette3}
      />
    );
  }
}