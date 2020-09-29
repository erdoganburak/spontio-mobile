import React, { Component } from 'react';
import store, { TRootReducer } from '../../redux/store';
import { connect, Provider } from 'react-redux';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
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
import CompanyProfileStack from './CompanyProfileStack';
import { Role } from '../../enums/role.enum';
import HelpStack from './HelpStack';
import MyOffersStack from './MyOffersStack';
import NavigationManager from '../../managers/navigation.manager';

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
          <NavigationContainer ref={(navigatorRef) => {
            NavigationManager.setTopLevelNavigator(navigatorRef)
          }}>
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
                component={HelpStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="question-circle" size={scale(22)} color={SpontioColors.White} />
                }}
              />
              {
                this.props.session.role === Role.Company &&
                <Drawer.Screen
                  name={translate("navigation.my_offers")}
                  component={MyOffersStack}
                  options={{
                    drawerIcon: config => <FontAwesomeIcon icon="tag" size={scale(22)} color={SpontioColors.White} />
                  }}
                />
              }
              {
                this.props.session.role === Role.User &&
                <Drawer.Screen
                  name={translate("navigation.user_profile")}
                  component={UserProfileStack}
                  options={{
                    drawerIcon: config => <FontAwesomeIcon icon="user" size={scale(22)} color={SpontioColors.White} />
                  }}
                />
              }
              {
                this.props.session.role === Role.Company &&
                <Drawer.Screen
                  name={translate("navigation.company_profile")}
                  component={CompanyProfileStack}
                  options={{
                    drawerIcon: config => <FontAwesomeIcon icon="user" size={scale(22)} color={SpontioColors.White} />
                  }}
                />
              }
              <Drawer.Screen
                name={translate("navigation.settings")}
                component={SettingsStack}
                options={{
                  drawerIcon: config => <FontAwesomeIcon icon="cog" size={scale(22)} color={SpontioColors.White} />
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