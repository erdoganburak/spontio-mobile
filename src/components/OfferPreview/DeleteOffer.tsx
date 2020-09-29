import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { TRootReducer } from '../../redux/store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../managers/language.manager';
import { ThunkDispatch } from 'redux-thunk';

class DeleteOffer extends Component<Props, State> {

    public readonly state: State = {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Are you sure you want to delete this offer?
                    </Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.yesContainer} onPress={this.props.onPressYes.bind(this)}>
                            <Text style={styles.yes}>
                                Yes
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.noContainer} onPress={this.props.onPressNo.bind(this)}>
                            <Text style={styles.no}>
                                No
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: moderateScale(20),
        height: '100%'
    },
    wrapper: {
        flex: 1
    },
    textContainer: {
        flex: 1
    },
    text: {
        fontSize: moderateScale(16),
    },
    buttons: {
        flex: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    yes: {
        padding: moderateScale(20),
        marginHorizontal:moderateScale(10),
        fontSize: moderateScale(16),
        color: SpontioColors.White,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    no: {
        padding: moderateScale(20),
        marginHorizontal:moderateScale(10),
        fontSize: moderateScale(16),
        color: SpontioColors.Primary,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    yesContainer: {
        backgroundColor: SpontioColors.Primary
    },
    noContainer: {
        backgroundColor: SpontioColors.DarkWhite
    }
});

interface IStateProps {

}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {

    }
}

interface IDispatchProps {

}

const mapDispatchToProps = (dispatch: ThunkDispatch<AnyAction, {}, any>): IDispatchProps => {
    return {

    }
}

export interface OwnProps {
    onPressYes: () => void;
    onPressNo: () => void;
}

type State = {

}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DeleteOffer);