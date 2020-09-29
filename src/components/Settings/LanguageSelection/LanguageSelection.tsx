import React, { Component, Dispatch } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LanguageSelectionItem from './LanguageSelectionItem';
import { LanguageList } from '../../../constants/language-codes.constant';
import { Language } from '../../../enums/language.enum';
import { translate } from '../../../managers/language.manager';
import StorageManager from '../../../managers/storage.manager';
import { LocalStorageKey } from '../../../enums/localStorageKey.enum';
import RNRestart from "react-native-restart";
import { NavigationProp } from '@react-navigation/native';
import { TRootReducer } from '../../../redux/store';
import { AnyAction } from 'redux';
import { showGoBackButton } from '../../../redux/actions/navigation';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import NavigationManager from '../../../managers/navigation.manager';
import { ThunkDispatch } from 'redux-thunk';

class LanguageSelection extends Component<Props, State> {

  constructor(props) {
    super(props);
  }

  private focusListener;

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', async () => this.handleFocus());
  }

  private async handleFocus() {
    console.log("focused on language selection");
    NavigationManager.setCurrentRoute(this.props.navigation.dangerouslyGetState());
  }

  async componentWillUnmount() {
    // Remove the event listener
    this.focusListener = this.props.navigation.removeListener('focus', async () => this.handleFocus());
  }


  render() {
    return (
      <View style={styles.container}>
        {LanguageList.map((value, index) => {
          return <LanguageSelectionItem key={index} onPress={this.onPressLanguageSelectionItem.bind(this, value.key)} languageOriginal={translate(value.original)} language={translate(value.value)} languageType={value.key}></LanguageSelectionItem>
        })}
      </View>
    );
  }

  private async onPressLanguageSelectionItem(key: Language) {
    await StorageManager.setItem(LocalStorageKey.Language, key);
    RNRestart.Restart();
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
  title: string;
  icon: string;
  onPress: () => void;
}

interface IDispatchProps {
  showGoBackButton: (show: boolean) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
  return {
    showGoBackButton: (show: boolean) => dispatch(showGoBackButton(show)),
  }
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(LanguageSelection);