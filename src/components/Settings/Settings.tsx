import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp, CommonActions } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SettingsItem from './SettingsItem';
import { translate } from '../../managers/language.manager';
import { SettingsActions } from '../../constants/settings-actions.constant';
import { SettingAction } from '../../enums/settingAction.enum';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { AnyAction } from 'redux';
import { showGoBackButton } from '../../redux/actions/navigation';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SessionManager from '../../managers/session.manager';
import NavigationManager from '../../managers/navigation.manager';

class Settings extends Component<Props, State> {

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
    console.log("focused on settings");
    NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
    //NavigationManager.setHeaderOptions(true, true, false);
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  render() {
    return (
      <View>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingItemHeader}>{translate("settings.more.title_more")}</Text>
          {
            SettingsActions.map((value, index) => {
              return <SettingsItem key={index} onPress={this.onPressSettingItem.bind(this, value.key)} icon={value.icon} title={translate(value.value)}></SettingsItem>
            })
          }
        </View>
        <TouchableOpacity onPress={this.onPressLogout.bind(this)}>
          <Text style={styles.logout}>
            Logout
          </Text>
        </TouchableOpacity>
      </View >
    )
  }

  private onPressSettingItem(key: SettingAction): void {
    switch (key) {
      case SettingAction.LanguageSelection:
        this.props.navigation.navigate(translate("navigation.language_selection"));
        break;
      default:
        break;
    }
  }

  private async onPressLogout() {
    //this.props.navigation.navigate("Welcome");
    await SessionManager.logout();
  }

}

const styles = StyleSheet.create({
  settingItemHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: SpontioColors.Primary,
    paddingVertical: moderateScale(10)
  },
  settingItemContainer: {
    padding: moderateScale(20)
  },
  logout: {
    padding: moderateScale(20),
    fontSize: moderateScale(14),
    color: SpontioColors.Primary,
    fontWeight: 'bold'
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
}

interface IDispatchProps {
  showGoBackButton: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
  return {
    showGoBackButton: (show: boolean) => dispatch(showGoBackButton(show)),
  }
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Settings);