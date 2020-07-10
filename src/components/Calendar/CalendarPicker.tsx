import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import ButtonCalendar from './ButtonCalendar';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';

class CalendarPicker extends Component<Props, State> {

    public readonly state: State = {
        showDatePicker: false
    }

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderDatePicker()}
                <View style={styles.buttonContainer}>
                    <ButtonCalendar onPress={this.onClick.bind(this)}></ButtonCalendar>
                </View>
                <View style={styles.textContainer}>
                    <StatusBar barStyle="light-content" />
                    <TextInput
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder={"Birthdate"}
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        style={styles.input}
                        returnKeyType="next"
                        value={this.props.date ? moment(this.props.date).format('DD/MM/YYYY') : ""}
                        editable = {false}
                    />
                </View>
            </View>
        );
    }

    private onClick() {
        console.log("click")
        this.setState({ showDatePicker: true });
    }

    private onTouchCancel() {
        console.log("cancel")
        this.setState({ showDatePicker: false });
    }

    private onDateChange(event, date) {
        this.setState({ showDatePicker: false });
        this.props.onDateChange(event, date);
    }

    private renderDatePicker() {
        if (this.state.showDatePicker)
            return (
                <View>
                    <Calendar date={this.props.date} onDateChange={this.onDateChange.bind(this)} onTouchCancel={this.onTouchCancel.bind(this)}></Calendar>
                </View>
            );
        return (<></>)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 0.2
    },
    textContainer: {
        flex: 0.8,
        backgroundColor: SpontioColors.Primary,
    },
    text: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: SpontioColors.White,
    },
    title: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: SpontioColors.White,
        textDecorationLine: "underline"
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
    onDateChange: (event, date) => {};
    date: Date;
    title: string
}

type State = {
    showDatePicker: boolean;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(CalendarPicker);