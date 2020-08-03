import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, Animated, Easing, Platform } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import NavigationManager from '../../managers/navigation.manager';
import LottieView from 'lottie-react-native';

class Favorites extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  private focusListener;

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
  }

  private async handleFocus() {
    console.log("focused on favorites");
    NavigationManager.setHeaderOptions(true, true, false, true);
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>
            <LottieView style={styles.lottieView} source={require('../../assets/animations/heart_clock_animation.json')} autoPlay loop={false} />
        </Text>
        </View >
      </View >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottieView: {
    width: moderateScale(280),
    height: moderateScale(280)
  }
});

interface IStateProps {
  session: Session,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
  }
}

type State = {

}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(Favorites);