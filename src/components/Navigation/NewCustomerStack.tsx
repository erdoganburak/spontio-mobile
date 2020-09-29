import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TRootReducer } from '../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../redux/reducer/sessionReducer';
import { createStackNavigator } from '@react-navigation/stack';
import NewCustomer from '../NewCustomer/NewCustomer';
import NewUser from '../NewCustomer/NewUser';
import { translate } from '../../managers/language.manager';
import NewCompany from '../NewCustomer/NewCompany';
import UserRegistrationFormSuccess from '../NewCustomer/UserRegistrationFormSuccess';

const NewCustomerStackNavigator = createStackNavigator();

class NewCustomerStack extends Component<Props, State> {

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
      <NewCustomerStackNavigator.Navigator screenOptions={{
        headerShown: false
      }}>
        <>
          <NewCustomerStackNavigator.Screen name={translate("navigation.new_customer")} component={NewCustomer} />
          <NewCustomerStackNavigator.Screen name={translate("navigation.new_user")} component={NewUser} />
          <NewCustomerStackNavigator.Screen name={translate("navigation.new_user_success")} component={UserRegistrationFormSuccess} />
          <NewCustomerStackNavigator.Screen name={translate("navigation.new_company")} component={NewCompany} />
        </>
      </NewCustomerStackNavigator.Navigator>
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

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(NewCustomerStack);