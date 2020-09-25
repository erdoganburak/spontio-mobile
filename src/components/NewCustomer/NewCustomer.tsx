import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { translate } from '../../managers/language.manager';
import NavigationManager from '../../managers/navigation.manager';

class NewCustomer extends Component<Props, State> {

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
    console.log("focused on new customer");
    NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  private onClickButtonUser() {
    this.props.navigation.navigate(translate("navigation.new_user"));
  }

  private onClickButtonCompany() {
    this.props.navigation.navigate(translate("navigation.new_company"));
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>YOU ARE A...</Text>
        </View >

        <View style={styles.userContainer}>
          <TouchableOpacity style={styles.buttonUser} onPress={this.onClickButtonUser.bind(this)}>
            <View style={styles.userTitleContainer}>
              <Text style={styles.userTitleText}>
                USER
            </Text>
            </View>
            <View style={styles.userDescriptionContainer}>
              <Text style={styles.userDescriptionText}>
                Would you like to find instant offers from different companies?
            </Text>
            </View>
            <View style={styles.userLogoWrapper}>
              <View style={styles.userLogoContainer}>
                <FontAwesomeIcon style={styles.userLogo} icon="user" size={scale(40)} color={SpontioColors.White} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.companyContainer}>
          <TouchableOpacity style={styles.buttonCompany} onPress={this.onClickButtonCompany.bind(this)}>
            <View style={styles.companyTitleContainer}>
              <Text style={styles.companyTitleText}>
                COMPANY
            </Text>
            </View>
            <View style={styles.companyDescriptionContainer}>
              <Text style={styles.companyDescriptionText}>
                Do you want to reach customers quickly and easily?
            </Text>
            </View>
            <View style={styles.companyLogoWrapper}>
              <View style={styles.companyLogoContainer}>
                <FontAwesomeIcon style={styles.companyLogo} icon="briefcase" size={scale(40)} color={SpontioColors.White} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: SpontioColors.White,
  },
  userContainer: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SpontioColors.White,
  },
  companyContainer: {
    flex: 0.45,
    backgroundColor: SpontioColors.Primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: SpontioColors.Gray,
  },
  buttonUser: {

  },
  buttonCompany: {

  },
  userTitleContainer: {
    alignSelf: 'center',
  },
  userTitleText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: SpontioColors.Primary
  },
  userDescriptionContainer: {
    alignSelf: 'center',
    paddingTop: moderateScale(20)
  },
  userDescriptionText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: SpontioColors.Gray,
    textAlign: 'center'
  },
  userLogoWrapper: {
    alignItems: 'center',
    padding: moderateScale(20)
  },
  userLogoContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: SpontioColors.Primary,
  },
  userLogo: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: moderateScale(10)
  },
  companyTitleContainer: {
    alignSelf: 'center',
  },
  companyTitleText: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: SpontioColors.White
  },
  companyDescriptionContainer: {
    alignSelf: 'center',
    paddingTop: moderateScale(20)
  },
  companyDescriptionText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: SpontioColors.White,
    textAlign: 'center'
  },
  companyLogoWrapper: {
    alignItems: 'center',
    padding: moderateScale(20)
  },
  companyLogoContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: SpontioColors.Primary,
  },
  companyLogo: {
    alignContent: 'center',
    justifyContent: 'center',
    margin: moderateScale(10)
  }
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

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(NewCustomer);