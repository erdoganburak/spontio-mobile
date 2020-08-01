import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class ButtonTimePicker extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={styles.iconContainer}>
                    <FontAwesomeIcon style={styles.icon} icon="clock" size={scale(22)} color={SpontioColors.White} />
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: scale(50),
        height: moderateScale(45),
        backgroundColor: SpontioColors.PrimaryDark,
        borderColor: SpontioColors.PrimaryLight,
        borderWidth: 2
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
    }
});

interface IStateProps {

}

export interface OwnProps {
    onPress: () => void;
    title: string,
}

type State = {
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(ButtonTimePicker);