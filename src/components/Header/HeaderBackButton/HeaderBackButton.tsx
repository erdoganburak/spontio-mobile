import React, { Component, Dispatch } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TRootReducer } from '../../../redux/store';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Session } from '../../../redux/reducer/sessionReducer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SpontioColors } from '../../../enums/spontioColors.enum';

class HeaderBackButton extends Component<Props, State> {

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
      <TouchableOpacity style={styles.headerButton} onPress={() => this.props.onPress()}>
        <FontAwesomeIcon icon="chevron-left" size={scale(22)} color={SpontioColors.White} />
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
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
  onPress: () => void;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(mapStateToProps, null)(HeaderBackButton)