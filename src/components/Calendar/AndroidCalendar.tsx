import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

class AndroidCalendar extends Component<Props, State> {

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
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default connect<IStateProps, {}, OwnProps>(null, null)(AndroidCalendar);