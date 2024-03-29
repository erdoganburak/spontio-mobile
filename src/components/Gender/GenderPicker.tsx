import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import ButtonGender from './ButtonGender';
import { Gender } from '../../enums/gender.enum';

class GenderPicker extends Component<Props, State> {

    public readonly state: State = {
        selectedGender: null
    }

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    private onClickGender(gender: Gender) {
        if (gender == this.state.selectedGender) {
            this.props.onClickGender(null);
            this.setState({ selectedGender: null })
        } else {
            this.props.onClickGender(gender);
            this.setState({ selectedGender: gender })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.genderContainer}>
                    <View style={styles.button}>
                        <ButtonGender selected={Gender.Male === this.state.selectedGender} gender={Gender.Male} onPress={this.onClickGender.bind(this, Gender.Male)}></ButtonGender>
                    </View>
                    <View style={styles.button}>
                        <ButtonGender selected={Gender.Female === this.state.selectedGender} gender={Gender.Female} onPress={this.onClickGender.bind(this, Gender.Female)}></ButtonGender>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignSelf:'center'
    },
    genderContainer: {
        flex: 0.4,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 0.6,
        backgroundColor: SpontioColors.PrimaryDark,
    },
    text: {
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        color: SpontioColors.White,
        textAlign:'left'
    },
    title: {
        fontSize: moderateScale(12),
        fontWeight: 'bold',
        color: SpontioColors.White,
    },
    button: {
        paddingRight: moderateScale(5)
    },
    input: {
        height: moderateScale(45),
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: scale(10),
        color: SpontioColors.White,
        paddingHorizontal: scale(10),
        borderStyle: 'solid',
        fontSize: moderateScale(12),
    }
});

interface IStateProps {

}

export interface OwnProps {
    title: string
    onClickGender: (selectedGender) => {};
}

type State = {
    selectedGender: Gender
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(GenderPicker);