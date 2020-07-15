import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Gender } from '../../enums/gender.enum';
import { IconName } from '@fortawesome/fontawesome-svg-core';

class ButtonGender extends Component<Props, State> {

    async componentDidMount() {
    }


    async componentWillUnmount() {

    }

    render() {
        const styleDefinitions = styles(this.props);

        return (
            <TouchableOpacity style={styleDefinitions.container} onPress={this.props.onPress}>
                <View style={styleDefinitions.iconContainer}>
                    <FontAwesomeIcon style={styleDefinitions.icon} icon={(this.props.gender == Gender.Male ? "male" : "female") as IconName} size={scale(22)} color={SpontioColors.White} />
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = (props: OwnProps) =>
    StyleSheet.create({
        container: {
            width: scale(50),
            height: moderateScale(45),
            backgroundColor: props.selected ? SpontioColors.Primary : SpontioColors.PrimaryDark,
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
    gender: Gender;
    selected: boolean
}

type State = {
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(ButtonGender);