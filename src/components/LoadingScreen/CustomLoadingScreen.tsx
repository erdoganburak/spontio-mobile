import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';

export class CustomLoadingScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text>LOADING</Text>
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
  icon: {
    color: SpontioColors.Primary
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});






