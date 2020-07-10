import React, { Component, Dispatch } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, DrawerActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator, HeaderBackButton, CardStyleInterpolators } from '@react-navigation/stack';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { moderateScale } from 'react-native-size-matters';
import { translate } from '../../managers/language.manager';
import HeaderDrawerButton from '../Header/HeaderDrawerButton/HeaderDrawerButton';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import UserProfile from '../UserProfile/UserProfile';
import { AnyAction } from 'redux';
import { showCamera, showTakenPicture, changePicture } from '../../redux/actions/camera';
import { changeUserProfilePicture } from '../../redux/actions/user';
import { Camera } from '../../redux/reducer/cameraReducer';

const UserProfileStackNavigator = createStackNavigator();

class UserProfileStack extends Component<Props, State> {

  public readonly state: State = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserProfileStackNavigator.Navigator screenOptions={{
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
          <UserProfileStackNavigator.Screen name={translate("navigation.user_profile")} component={UserProfile} />
        </>
      </UserProfileStackNavigator.Navigator>
    );
  }


  private onPressHeaderButton(): void {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  private onPressBackButton(): void {
    console.log("Pressing back from user profile");
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

interface IDispatchProps {
  showCamera: (show: boolean) => void;
  changeUserProfilePicture: (profilePicture: string) => void
  showTakenPicture: (showTakenPicture: boolean) => void;
  changePicture: (picture: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
  return {
    showCamera: (show: boolean) => dispatch(showCamera(show)),
    changeUserProfilePicture: (profilePicture: string) => dispatch(changeUserProfilePicture(profilePicture)),
    showTakenPicture: (show: boolean) => dispatch(showTakenPicture(show)),
    changePicture: (picture: string) => dispatch(changePicture(picture))
  }
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserProfileStack);