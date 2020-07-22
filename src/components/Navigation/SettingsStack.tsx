import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, DrawerActions, StackActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import Settings from '../Settings/Settings';
import LanguageSelection from '../Settings/LanguageSelection/LanguageSelection';
import { translate } from '../../managers/language.manager';
import HeaderDrawerButton from '../Header/HeaderDrawerButton/HeaderDrawerButton';
import HeaderBackButton from '../Header/HeaderBackButton/HeaderBackButton';

import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import SpontioHeaderBackground from '../Header/HeaderBackground/SpontioHeaderBackground';

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
            <SpontioHeaderBackground></SpontioHeaderBackground>

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