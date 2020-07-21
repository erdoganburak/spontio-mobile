import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, DrawerActions, StackActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { moderateScale } from 'react-native-size-matters';
import { translate } from '../../managers/language.manager';
import HeaderDrawerButton from '../Header/HeaderDrawerButton/HeaderDrawerButton';
import HeaderBackButton from '../Header/HeaderBackButton/HeaderBackButton';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import Help from '../Help/Help';
import WhoWeAre from '../Help/WhoWeAre/WhoWeAre';
import SocialMedia from '../Help/SocialMedia/SocialMedia';
import Faq from '../Help/Faq/Faq';
import TermsOfUse from '../Help/TermsOfUse/TermsOfUse';
import ContactUs from '../Help/ContactUs/ContactUs';
import Privacy from '../Help/Privacy/Privacy';

const HelpStackNavigator = createStackNavigator();

class HelpStack extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HelpStackNavigator.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerBackground: (props) => (
            <View style={{ backgroundColor: SpontioColors.Primary, flex: 1 }}>
              <Image
                style={{ width: moderateScale(140), height: moderateScale(40), backgroundColor: SpontioColors.Primary, alignSelf: 'center', justifyContent: 'center', flex: 1 }}
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
          <HelpStackNavigator.Screen name={translate("navigation.help")} component={Help} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.who_we_are")} component={WhoWeAre} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.social_media")} component={SocialMedia} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.faq")} component={Faq} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.terms_of_use")} component={TermsOfUse} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.contact_us")} component={ContactUs} />
        </>
        <>
          <HelpStackNavigator.Screen name={translate("navigation.privacy")} component={Privacy} />
        </>
      </HelpStackNavigator.Navigator>
    );
  }

  private onPressHeaderButton(): void {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  private onPressBackButton(): void {
    console.log("Pressing back from help");
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

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(HelpStack);