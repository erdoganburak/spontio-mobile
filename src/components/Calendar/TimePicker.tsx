import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import { ModalSize } from '../../enums/modalSize.enum';
import ModalBase, { IProps } from '../Modal/ModalBase';
import AndroidTimePicker from './AndroidTimePicker';
import IOSTimePicker from './IOSTimePicker';
import ButtonTimePicker from './ButtonTimePicker';

class TimePicker extends Component<Props, State> {

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
                    <ButtonTimePicker onPress={this.onClick.bind(this)}></ButtonTimePicker>
                </View>
                <View style={styles.textContainer}>
                    <StatusBar barStyle="light-content" />
                    <TextInput
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType="default"
                        placeholder={this.props.title}
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        style={styles.input}
                        returnKeyType="next"
                        value={this.props.date ? moment(this.props.date).format('HH:mm') : ""}
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
        const _modalProps: IProps = {
            isVisible: this.state.showIOSModal,
            onBackdropPress: this.onBackdropPressModal.bind(this),
            title: "Choose",
            closeButtonHide: false,
            needKeyboardAvoid: false,
            onClose: this.onCloseModal.bind(this),
            backdropColor: SpontioColors.Black,
            backdropOpacity: 0.15,
            size: ModalSize.Sm,
        }

        return (
            <ModalBase
                modalProps={_modalProps}
            >
                <View>
                    <IOSTimePicker date={this.props.date} onDateChange={this.onDateChange.bind(this)} onTouchCancel={this.onTouchCancel.bind(this)}></IOSTimePicker>
                </View>
            </ModalBase>
        );
    }

    private renderDatePicker() {
        if (this.state.showDatePicker) {
            if (Platform.OS === "android") {
                return (
                    <View>
                        <AndroidTimePicker date={this.props.date} onDateChange={this.onDateChange.bind(this)} onTouchCancel={this.onTouchCancel.bind(this)}></AndroidTimePicker>
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
        backgroundColor: 'rgb(115,61,81)',
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

export default connect<IStateProps, {}, OwnProps>(null, null)(TimePicker);