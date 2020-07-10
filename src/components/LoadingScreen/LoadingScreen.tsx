import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';

export class LoadingScreen extends Component {

  render() {
    return (
      <ActivityIndicator size="large" color={SpontioColors.Primary} style={styles.activityIndicator} />
    );
  }

}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});






