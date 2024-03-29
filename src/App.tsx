import * as React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { CustomLoadingScreen } from './components/LoadingScreen/CustomLoadingScreen';
import InitializeNavigationScreen from './components/Navigation/InitializeNavigationScreen';
import SessionManager from './managers/session.manager';
import IconManager from './managers/icon.manager';
import * as RNLocalize from "react-native-localize";
import LanguageManager from './managers/language.manager';

type State = {
  loading: boolean,
  appState: AppStateStatus
}

export default class App extends React.Component<State, any> {

  public readonly state: State = {
    loading: false,
    appState: AppState.currentState
  }

  constructor(props: any) {
    super(props);
    IconManager.addIconToLibrary();
  }

  async componentDidMount() {
    this.setState({ loading: true });
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    await LanguageManager.setI18nConfig();
    await SessionManager.initializeApp();
    // EventManager.addEventListener(EventManager.EVENT_APP_MESSAGE, this.onAppMessageReceived);
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    //EventManager.removeEventListener(EventManager.EVENT_APP_MESSAGE, this.onAppMessageReceived);
  }

  handleLocalizationChange = () => {
    LanguageManager.setI18nConfig().then(() => {
      this.forceUpdate();
    }).catch(() => {

    })
  };

  public render() {
    if (this.state.loading) {
      return (
        <CustomLoadingScreen></CustomLoadingScreen>
      )
    }
    else {
      return (
        <InitializeNavigationScreen></InitializeNavigationScreen>
      );
    }
  }

}



