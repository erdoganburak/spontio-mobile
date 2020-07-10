import React, { Component, Dispatch } from 'react';
import store, { TRootReducer } from '../../redux/store';
import { connect, Provider } from 'react-redux';
import { NavigationContainer, NavigationProp, StackActions } from '@react-navigation/native';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Session } from '../../redux/reducer/sessionReducer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';
import SettingsStack from './SettingsStack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { translate } from '../../managers/language.manager';
import UserProfileStack from './UserProfileStack';


const Drawer = createDrawerNavigator();

/**
 * Initializes navigation system for the app.
 */
class InitializeNavigationScreen extends Component<Props, State> {

  public readonly state: State = {
    loading: false
  }

  constructor(props) {
    super(props);
  }

  public render() {
    if (this.state.loading) {
      return (
        <LoadingScreen></LoadingScreen>
      )
    }
    else {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="HomeDrawer"
              drawerContentOptions={{
                activeBackgroundColor: SpontioColors.Primary,
                contentContainerStyle: {
                },
                labelStyle: {
                  color: SpontioColors.White
                },
                style: {
                  backgroundColor: SpontioColors.Primary
                }
              }}

            >
              <Drawer.Screen
                name={translate("navigation.home")}
                component={MainStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="home" size={scale(22)} color={SpontioColors.White} />
                }}
              />
              <Drawer.Screen
                name={translate("navigation.help")}
                component={MainStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="question-circle" size={scale(22)} color={SpontioColors.White} />
                }}
              />
              <Drawer.Screen
                name={translate("navigation.settings")}
                component={SettingsStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="cog" size={scale(22)} color={SpontioColors.White} />
                }}
              />
              <Drawer.Screen
                name={translate("navigation.user_profile")}
                component={UserProfileStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="user" size={scale(22)} color={SpontioColors.White} />
                }}
              />

            </Drawer.Navigator>

          </NavigationContainer>
        </Provider >
      );
    }
  }

}

interface IStateProps {
  session: Session,
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    session: state.sessionReducer.session,
  }
}

type State = {
  loading: boolean;
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(InitializeNavigationScreen);