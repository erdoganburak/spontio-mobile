import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { TRootReducer } from '../../../redux/store';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import NavigationManager from '../../../managers/navigation.manager';

class Privacy extends Component<Props, State> {

  constructor(props) {
    super(props);
  }

  private focusListener;

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
  }

  private async handleFocus() {
    console.log("focused on privacy");
    NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Privacy</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1
    }
  }
)

interface IStateProps {
  navigationProperty: NavigationProperty
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
  return {
    navigationProperty: state.navigationReducer.navigationProperty
  }
}

export interface OwnProps {
  navigation: NavigationProp<any>;
}

type State = {

}

type Props = IStateProps  & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(Privacy);