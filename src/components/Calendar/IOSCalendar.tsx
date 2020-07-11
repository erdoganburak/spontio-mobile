import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { SpontioColors } from '../../enums/spontioColors.enum';

class IOSCalendar extends Component<Props, State> {

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <DateTimePicker
                    testID="dateTimePicker"
                    is24Hour={true}
                    display="default"
                    onChange={this.props.onDateChange}
                    value={this.props.date == null ? new Date() : this.props.date}
                    onTouchCancel={this.props.onTouchCancel}
                    style={{
                        backgroundColor: SpontioColors.White,
                    }}
                />
            </View>
        );
    }

}
// TODO FIND A WAY TO CENTER CALENDAR VERTICALLY
const styles = StyleSheet.create({
    container: {
        flex:1
    }
});

interface IStateProps {

}

export interface OwnProps {
    onDateChange: (event, date) => {};
    onTouchCancel: () => void;
    date: Date;
}

type State = {
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(IOSCalendar);