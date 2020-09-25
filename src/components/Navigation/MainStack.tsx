import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, DrawerActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import HomeTabs from './HomeTabs';
import NewCustomerStack from './NewCustomerStack';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import HeaderDrawerButton from '../Header/HeaderDrawerButton/HeaderDrawerButton';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { Camera } from '../../redux/reducer/cameraReducer';
import { translate } from '../../managers/language.manager';
import HeaderBackButton from '../Header/HeaderBackButton/HeaderBackButton';
import SpontioHeaderBackground from '../Header/HeaderBackground/SpontioHeaderBackground';

const MainStackNavigator = createStackNavigator();

class MainStack extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainStackNavigator.Navigator
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
            this.props.session.loggedIn ?
              (
                this.props.navigationProperty.showGoBackButton ?
                  (<HeaderBackButton onPress={this.onPressBackButton.bind(this)}
                  ></HeaderBackButton>) :
                  (
                    this.props.navigationProperty.showDrawer ?
                      (<HeaderDrawerButton onPress={this.onPressHeaderButton.bind(this)}
                      ></HeaderDrawerButton>)
                      :
                      (<></>)
                  )

              )
              :
              (
                this.props.navigationProperty.showGoBackButton ?
                  (<HeaderBackButton onPress={this.onPressBackButton.bind(this)}
                  ></HeaderBackButton>)
                  :
                  (<></>)
              )
          ),
        }}>
        <>
          <MainStackNavigator.Screen name={translate("navigation.welcome")} component={Welcome} />
          <MainStackNavigator.Screen name={translate("navigation.new_customer")} component={NewCustomerStack} />
          <MainStackNavigator.Screen name={translate("navigation.login")} component={Login} />
          <MainStackNavigator.Screen name={translate("navigation.home")} component={HomeTabs} />
        </>

      </MainStackNavigator.Navigator>
    );
  }

  private onPressHeaderButton(): void {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  private onPressBackButton(): void {
    console.log("Pressing back from main stack");
    this.props.navigation.goBack();
  }

}

const styles = StyleSheet.create({

});

interface IStateProps {
  session: Session,
  navigationProperty: NavigationProperty,
  camera: Camera
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
    navigationProperty: state.navigationReducer.navigationProperty,
    camera: state.cameraReducer.camera
  }
}


type State = {

}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(MainStack);