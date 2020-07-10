import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import ButtonCalendar from './ButtonCalendar';
import moment from 'moment';

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
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.text}>
                        {this.props.date ? moment(this.props.date).format('DD/MM/YYYY') : "../../...."}
                    </Text>
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
        flexDirection: 'row',
        height: moderateScale(45),
        marginBottom: moderateScale(10)
    },
    buttonContainer: {
        flex: 0.2
    },
    textContainer: {
        flex: 0.8,
        backgroundColor: SpontioColors.Primary,
        justifyContent: 'flex-end',
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