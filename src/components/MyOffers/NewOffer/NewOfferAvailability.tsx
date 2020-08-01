import React, { Component, Dispatch } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { TRootReducer } from '../../../redux/store';
import { SpontioColors } from '../../../enums/spontioColors.enum';
import { NavigationProperty } from '../../../redux/reducer/navigationReducer';
import { AnyAction } from 'redux';
import { NewOfferObject } from '../../../redux/reducer/newOfferReducer';
import { changeNewOfferTitle } from '../../../redux/actions/newOffer';
import CalendarPicker from '../../../components/Calendar/CalendarPicker';
import TimePicker from '../../../components/Calendar/TimePicker';

class NewOfferAvailability extends Component<Props, State> {

    public readonly state: State = {
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date()
    }

    private onStartDateChange(event, date) {
        if (date != null)
            this.setState({ startDate: date })
    }

    private onStartTimeChange(event, date) {
        console.log(date)
        if (date != null)
            this.setState({ startTime: date })
    }

    private onEndDateChange(event, date) {
        if (date != null)
            this.setState({ endDate: date })
    }

    private onEndTimeChange(event, date) {
        if (date != null)
            this.setState({ endTime: date })
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
        paddingTop:moderateScale(20)
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
    changeNewOfferTitle: (newOfferTitle: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): IDispatchProps => {
    return {
        changeNewOfferTitle: (newOfferTitle: string) => dispatch(changeNewOfferTitle(newOfferTitle)),
    }
}

export interface OwnProps {
    navigation: NavigationProp<any>;
}

type State = {
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date
}

type Props = IStateProps & IDispatchProps & OwnProps

export default connect<IStateProps, IDispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(NewOfferAvailability);