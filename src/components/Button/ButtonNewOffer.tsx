import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';

class ButtonNewOffer extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        const styleDefinitions = styles(this.props);

        return (
            <TouchableOpacity style={styleDefinitions.button} onPress={this.props.onPress}>
                <Text style={styleDefinitions.text}>
                    +
                </Text>
            </TouchableOpacity>
        );
    }

}

const styles = (props: Props) =>
    StyleSheet.create({
        button: {
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: moderateScale(50 / 2),
            marginBottom: moderateScale(10),
            backgroundColor: SpontioColors.Primary,
            borderColor: SpontioColors.Primary,
            borderWidth: 2,
        },
        text: {
            color: SpontioColors.White,
            fontWeight: "bold",
            flex: 1,
            textAlign: 'center',
            paddingVertical: moderateScale(7),
            fontSize: moderateScale(25),
        }
    });

interface IStateProps {

}

export interface OwnProps {
    navigation: NavigationProp<any>;
    onPress: () => void;
}

type State = {
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(ButtonNewOffer);