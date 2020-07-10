import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, DrawerActions, StackActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator, HeaderBackButton, CardStyleInterpolators } from '@react-navigation/stack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import Settings from '../Settings/Settings';
import { moderateScale } from 'react-native-size-matters';
import LanguageSelection from '../Settings/LanguageSelection/LanguageSelection';
import { translate } from '../../managers/language.manager';
import HeaderDrawerButton from '../Header/HeaderDrawerButton/HeaderDrawerButton';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';

const SettingsStackNavigator = createStackNavigator();

class SettingsStack extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SettingsStackNavigator.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackground: (props) => (
            <View style={{ backgroundColor: SpontioColors.Primary, flex: 1 }}>
              <Image
                style={{ width: moderateScale(150), height: moderateScale(50), backgroundColor: SpontioColors.Primary, alignSelf: 'center', justifyContent: 'center', flex: 1 }}
                source={require('../../assets/spontio_name_logo1.png')}
                resizeMode='contain'
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: SpontioColors.Primary,
          },
          headerTintColor: SpontioColors.White,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: SpontioColors.White,
          },
          headerTitle: "",
          headerShown: this.props.navigationProperty.showHeader,
          headerLeft: (props) => (

            this.props.navigationProperty.showGoBackButton ?
              (
                <HeaderBackButton onPress={this.onPressBackButton.bind(this)}
                ></HeaderBackButton>
              ) :
              (
                this.props.navigationProperty.showDrawer ?
                  (
                    <HeaderDrawerButton onPress={this.onPressHeaderButton.bind(this)}
                    ></HeaderDrawerButton>
                  ) :
                  (
                    <></>
                  )
              )

          ),
        }}>
        <>
          <SettingsStackNavigator.Screen name={translate("navigation.settings")} component={Settings} />
        </>
        <>
          <SettingsStackNavigator.Screen name={translate("navigation.language_selection")} component={LanguageSelection} />
        </>
      </SettingsStackNavigator.Navigator>
    );
  }

  private onPressHeaderButton(): void {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  private onPressBackButton(): void {
    console.log("Pressing back from settings");
    this.props.navigation.dispatch(StackActions.pop(1));
  }

}

const styles = StyleSheet.create({

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
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(SettingsStack);