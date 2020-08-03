import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TRootReducer } from '../../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';

class SpontioHeaderBackground extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  async componentWillUnmount() {
  }

  render() {
    return (
      <View style={{ backgroundColor: SpontioColors.Primary, flex: 1 }}>
        {
          this.props.navigationProperty.showHeaderLogo &&
          <Image
            style={{ width: moderateScale(140), height: moderateScale(40), backgroundColor: SpontioColors.Primary, alignSelf: 'center', justifyContent: 'center', flex: 1 }}
            source={require('../../../assets/images/spontio_logo.png')}
            resizeMode='contain'
          />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

interface IStateProps {
  session: Session,
  navigationProperty: NavigationProperty
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
    navigationProperty: state.navigationReducer.navigationProperty
  }
}

type State = {

}

export interface OwnProps {
  navigation: NavigationProp<any>;
  onPress: () => void;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(SpontioHeaderBackground)