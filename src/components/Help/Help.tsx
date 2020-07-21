import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { translate } from '../../managers/language.manager';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { NavigationProperty } from '../../redux/reducer/navigationReducer';
import NavigationManager from '../../managers/navigation.manager';
import HelpItem from './HelpItem';
import { HelpActions } from '../../constants/help-actions.constant';
import { HelpAction } from '../../enums/helpAction.enum';
import { AboutUsActions } from '../../constants/about-us-actions.constant';

class Help extends Component<Props, State> {

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
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  render() {
    return (
      <View>
        <View style={styles.helpItemContainer}>
          <Text style={styles.helpItemHeader}>{translate("help.about_us")}</Text>
          {
            AboutUsActions.map((value, index) => {
              return <HelpItem key={index} onPress={this.onPressHelpItem.bind(this, value.key)} title={translate(value.value)}></HelpItem>
            })
          }
        </View>
        <View style={styles.helpItemContainer}>
          <Text style={styles.helpItemHeader}>{translate("help.help")}</Text>
          {
            HelpActions.map((value, index) => {
              return <HelpItem key={index} onPress={this.onPressHelpItem.bind(this, value.key)} title={translate(value.value)}></HelpItem>
            })
          }
        </View>
      </View >
    )
  }

  private onPressHelpItem(key: HelpAction): void {
    switch (key) {
      case HelpAction.WhoWeAre:
        this.props.navigation.navigate(translate("navigation.who_we_are"));
        break;
      case HelpAction.SocialMedia:
        this.props.navigation.navigate(translate("navigation.social_media"));
        break;
      case HelpAction.FAQ:
        this.props.navigation.navigate(translate("navigation.faq"));
        break;
      case HelpAction.TermsOfUse:
        this.props.navigation.navigate(translate("navigation.terms_of_use"));
        break;
      case HelpAction.ContactUs:
        this.props.navigation.navigate(translate("navigation.contact_us"));
        break;
      case HelpAction.Privacy:
        this.props.navigation.navigate(translate("navigation.privacy"));
        break;
      default:
        break;
    }
  }

}

const styles = StyleSheet.create({
  helpItemHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: SpontioColors.Primary,
    paddingVertical: moderateScale(10)
  },
  helpItemContainer: {
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

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(Help);