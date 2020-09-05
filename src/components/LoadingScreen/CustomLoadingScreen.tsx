import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';

export class CustomLoadingScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <ActivityIndicator style={styles.activityIndicator} color={SpontioColors.Primary}></ActivityIndicator>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SpontioColors.White,
    justifyContent: 'center',
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {

  }
});






