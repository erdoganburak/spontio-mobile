import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import AndroidCalendar from './AndroidCalendar';
import IOSCalendar from './IOSCalendar';
import ButtonCalendar from './ButtonCalendar';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import { ModalSize } from '../../enums/modalSize.enum';
import ModalBase from '../Modal/ModalBase';

class CalendarPicker extends Component<Props, State> {

    public readonly state: State = {
        showDatePicker: false,
        showIOSModal: false
    }

    async componentDidMount() {

    }

    async componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderDatePicker()}
                {this.renderIOSModal()}
                <View style={styles.buttonContainer}>
                    <ButtonCalendar onPress={this.onClick.bind(this)}></ButtonCalendar>
                </View>
                <View style={styles.textContainer}>
                    <StatusBar barStyle="light-content" />
                    <TextInput
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder={"Birthdate"}
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        style={styles.input}
                        returnKeyType="next"
                        value={this.props.date ? moment(this.props.date).format('DD/MM/YYYY') : ""}
                        editable={false}
                    />
                </View>
            </View>
        );
    }

    private onClick() {
        if (Platform.OS === "ios") {
            this.setState({ showIOSModal: true });
        }
        else if (Platform.OS === "android") {
            this.setState({ showDatePicker: true });
        }
    }

    private onTouchCancel() {
        if (Platform.OS === "ios") {
            this.setState({ showIOSModal: false });
        }
        else if (Platform.OS === "android") {
            this.setState({ showDatePicker: false });
        }
    }

    private onCloseModal(): void {
        this.setState({ showIOSModal: false });
    }

    private onBackdropPressModal(): void {
        this.setState({ showIOSModal: false });
    }

    private onDateChange(event, date) {
        this.setState({ showDatePicker: false });
        this.props.onDateChange(event, date);
    }

    private renderIOSModal() {
            return (
                <ModalBase
                    isVisible={this.state.showIOSModal}
                    onBackdropPress={this.onBackdropPressModal.bind(this)}
                    title={"Choose"}
                    closeButtonHide={false}
                    needKeyboardAvoid={false}
                    onClose={this.onCloseModal.bind(this)}
                    backdropColor={SpontioColors.Black}
                    backdropOpacity={0.15}
                    size={ModalSize.Sm}
                >
                    <View>
                        <IOSCalendar date={this.props.date} onDateChange={this.onDateChange.bind(this)} onTouchCancel={this.onTouchCancel.bind(this)}></IOSCalendar>
                    </View>
                </ModalBase>
            );
    }

    private renderDatePicker() {
        if (this.state.showDatePicker) {
            if (Platform.OS === "android") {
                return (
                    <View>
                        <AndroidCalendar date={this.props.date} onDateChange={this.onDateChange.bind(this)} onTouchCancel={this.onTouchCancel.bind(this)}></AndroidCalendar>
                    </View>
                );
            }
        }
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
    showIOSModal: boolean;
}

type Props = IStateProps & OwnProps

export default connect<IStateProps, {}, OwnProps>(null, null)(CalendarPicker);