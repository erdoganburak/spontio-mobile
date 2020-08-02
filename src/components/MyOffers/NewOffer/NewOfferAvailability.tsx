import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferStartDate, changeNewOfferStartTime, changeNewOfferEndDate, changeNewOfferEndTime } from '../../../redux/actions/newOffer';
import CalendarPicker from '../../../components/Calendar/CalendarPicker';
import TimePicker from '../../../components/Calendar/TimePicker';

class NewOfferAvailability extends Component<Props, State> {

    // States inside component seems useless but they are used to fix accuracy issues with redux.
    public readonly state: State = {
        startDate: this.props.newOffer.newOfferStartDate ? this.props.newOffer.newOfferStartDate : new Date(),
        startTime: this.props.newOffer.newOfferStartTime ? this.props.newOffer.newOfferStartTime : new Date(),
        endDate: this.props.newOffer.newOfferEndDate ? this.props.newOffer.newOfferEndDate : new Date(),
        endTime: this.props.newOffer.newOfferEndTime ? this.props.newOffer.newOfferEndTime : new Date()
    }

    private onStartDateChange(event, date) {
        this.setState({ startDate: date });
        this.props.changeNewOfferStartDate(date);
    }

    private onStartTimeChange(event, date) {
        this.setState({ startTime: date });
        this.props.changeNewOfferStartTime(date);
    }

    private onEndDateChange(event, date) {
        this.setState({ endDate: date });
        this.props.changeNewOfferEndDate(date);
    }

    private onEndTimeChange(event, date) {
        this.setState({ endTime: date });
        this.props.changeNewOfferEndTime(date);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            Availability
                    </Text>
                        <View style={styles.calenderPicker}>
                            <CalendarPicker title={"Start Date"} date={this.state.startDate} onDateChange={this.onStartDateChange.bind(this)}></CalendarPicker>
                            <TimePicker title={"Start Time"} date={this.state.startTime} onDateChange={this.onStartTimeChange.bind(this)}></TimePicker>
                            <CalendarPicker title={"End Date"} date={this.state.endDate} onDateChange={this.onEndDateChange.bind(this)}></CalendarPicker>
                            <TimePicker title={"End Time"} date={this.state.endTime} onDateChange={this.onEndTimeChange.bind(this)}></TimePicker>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SpontioColors.DarkWhite,
    },
    box: {
        backgroundColor: SpontioColors.White,
        marginVertical: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(18),
        fontWeight: 'bold'
    },
    content: {
        padding: moderateScale(20),
        justifyContent: 'center'
    },
    calenderPicker: {
        flex: 1,
        paddingTop: moderateScale(20)
    },
});

interface IStateProps {
    navigationProperty: NavigationProperty,
    newOffer: NewOfferObject
}

const mapStateToProps = (state: TRootReducer): IStateProps => {
    return {
        navigationProperty: state.navigationReducer.navigationProperty,
        newOffer: state.newOfferReducer.newOffer
    }
}

interface IDispatchProps {
    changeNewOfferStartDate: (newOfferStartDate: Date) => void;
    changeNewOfferStartTime: (newOfferStartTime: Date) => void;
    changeNewOfferEndDate: (newOfferEndDate: Date) => void;
    changeNewOfferEndTime: (newOfferEndTime: Date) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeNewOfferStartDate: (newOfferStartDate: Date) => dispatch(changeNewOfferStartDate(newOfferStartDate)),
        changeNewOfferStartTime: (newOfferStartTime: Date) => dispatch(changeNewOfferStartTime(newOfferStartTime)),
        changeNewOfferEndDate: (newOfferEndDate: Date) => dispatch(changeNewOfferEndDate(newOfferEndDate)),
        changeNewOfferEndTime: (newOfferEndTime: Date) => dispatch(changeNewOfferEndTime(newOfferEndTime)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    startDate: Date,
    startTime: Date,
    endDate: Date,
    endTime: Date
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferAvailability);