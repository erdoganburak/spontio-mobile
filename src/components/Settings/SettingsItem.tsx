import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { SpontioColors } from '../../enums/spontioColors.enum';

class SettingsItem extends Component<Props, State> {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <FontAwesomeIcon style={styles.icon} icon={this.props.icon as IconName} size={scale(13)} />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{this.props.title}</Text>
          </View>
          <View style={styles.actionIconContainer}>
            <FontAwesomeIcon style={styles.actionIcon} icon="chevron-right" size={scale(13)} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create(
  {
    container: {
      height: moderateScale(30),
      marginBottom: moderateScale(10),
    },

    subContainer: {
      flex: 4,
      flexDirection: 'row'
    },
    iconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: SpontioColors.Primary
    },
    actionIconContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    actionIcon: {
      color: SpontioColors.Primary
    },
    buttonContainer: {
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    buttonText: {
      textAlign: 'left',
      textAlignVertical: 'center',
      color: SpontioColors.Black,
      fontWeight: '700',
      fontSize: moderateScale(14),
    }
  }
)
export interface OwnProps {
  title: string;
  icon: string;
  onPress: () => void;
}

type State = {

}

interface IStateProps {

}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(SettingsItem);