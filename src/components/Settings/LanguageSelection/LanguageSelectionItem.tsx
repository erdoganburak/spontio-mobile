import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { Language } from '../../../enums/language.enum';

class LanguageSelectionItem extends Component<Props, State> {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View style={styles.languageOriginalContainer}>
          <Text style={styles.languageOriginalText}>{this.props.languageOriginal}</Text>
        </View>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{this.props.language}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create(
  {
    container: {
      margin: moderateScale(10)

    },
    languageOriginalContainer: {
    },
    languageOriginalText: {
      color: SpontioColors.Black,
      fontSize: moderateScale(14),
    },
    languageContainer: {
    },
    languageText: {
      color: SpontioColors.Gray,
      fontSize: moderateScale(14),
    }
  }
)
export interface OwnProps {
  languageOriginal: string;
  language: string;
  languageType: Language;
  onPress: () => void;
}

type State = {

}

interface IStateProps {

}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(LanguageSelectionItem);