import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Favorites from '../Favorites/Favorites';
import OnlineOffers from '../OnlineOffers/OnlineOffers';
import LocalOffers from '../LocalOffers/LocalOffers';
import { translate } from '../../managers/language.manager';

const HomeTabsNavigator = createBottomTabNavigator();

// TODO check tab size for new iphones

class HomeTabs extends Component<Props, State> {

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
      <HomeTabsNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === translate("navigation.local_offers")) {
              iconName = focused ? 'ios-cart' : 'ios-cart';
            }
            else if (route.name === translate("navigation.online_offers")) {
              iconName = focused ? 'ios-locate' : 'ios-locate';
            }
            else if (route.name === translate("navigation.favorites")) {
              iconName = focused ? 'ios-heart' : 'ios-heart';
            }
            return <Ionicons name={iconName} size={moderateScale(size)} color={color} />;
          },
        })
        }
        tabBarOptions={{
          activeTintColor: SpontioColors.Primary,
          inactiveTintColor: SpontioColors.Gray,
          labelStyle: {
            fontSize: moderateScale(10),
          },
          style: {
            height: moderateScale(50)
          }
        }}
      >
        <HomeTabsNavigator.Screen name={translate("navigation.local_offers")} component={LocalOffers} />
        <HomeTabsNavigator.Screen name={translate("navigation.online_offers")} component={OnlineOffers} />
        <HomeTabsNavigator.Screen name={translate("navigation.favorites")} component={Favorites} />
      </HomeTabsNavigator.Navigator >
    );
  }

}

const styles = StyleSheet.create({

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

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(HomeTabs);