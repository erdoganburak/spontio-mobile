import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';

class ButtonPrimary extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        const styleDefinitions = styles(this.props);

        return (
            <TouchableOpacity style={styleDefinitions.button} onPress={this.props.onPress}>
                <Text style={styleDefinitions.text}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }

}

const styles = (props: Props) =>
    StyleSheet.create({
        button: {
            width: scale(props.width ? props.width : 300),
            height: moderateScale(45),
            marginBottom: moderateScale(10),
            backgroundColor: SpontioColors.White,
            borderColor: SpontioColors.White,
            borderWidth: 2
        },
        text: {
            color: SpontioColors.Black,
            fontWeight: "bold",
            flex: 1,
            textAlign: 'center',
            paddingVertical: moderateScale(12),
            fontSize: moderateScale(14),
        }
    });

interface IStateProps {

}

export interface OwnProps {
    navigation: NavigationProp<any>;
    onPress: () => void;
    title: string,
    width: number
}

type State = {
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(ButtonPrimary);