import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import HelperUtils from '../../utils/helper.utils';
import { SpontioColors } from '../../enums/spontioColors.enum';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ModalSize } from '../../enums/modalSize.enum';

export interface IProps extends ModalProps {
	isVisible: boolean;
	title: string;
	closeButtonHide?: boolean;
	closeButtonLabel?: string;
	needKeyboardAvoid?: boolean;
	size?: ModalSize
	onClose?: () => void;
}

/**
 * Modal for Spontio
 */
export default class ModalBase extends React.Component<IProps> {
	constructor(props: any) {
		super(props);
		this.onCloseButtonClicked = this.onCloseButtonClicked.bind(this);
	}

	public render() {
		return (
			<Modal style={{ margin: 0, justifyContent: 'flex-end' }}{...this.props} useNativeDriver={true} hideModalContentWhileAnimating={true}>
				{this.props.needKeyboardAvoid && (
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : null}>
						{this.renderModalContent()}
					</KeyboardAvoidingView>
				)}
				{!this.props.needKeyboardAvoid && this.renderModalContent()}
			</Modal>
		);
	}

	private renderModalContent() {
		const styleDefinitions = styles(this.props);

		return (
			<View style={styleDefinitions.container}>
				<View style={styleDefinitions.modal}>
					<View style={styleDefinitions.header}>
						<View style={styleDefinitions.closeButton}>
							{!this.props.closeButtonHide && (
								<TouchableOpacity onPress={this.onCloseButtonClicked.bind(this)}>
									<FontAwesomeIcon style={styleDefinitions.icon} icon="times" size={scale(22)} />
								</TouchableOpacity>
							)}
						</View>
						{this.props.title ?
							(<View style={styleDefinitions.titleContainer}>
								{HelperUtils.hasValueV2(this.props.title) && <Text numberOfLines={1} style={styleDefinitions.title}>{this.props.title}</Text>}
							</View>)
							:
							(<View >

							</View>)
						}
					</View>
					<View style={HelperUtils.hasValueV2(this.props.title) ? styleDefinitions.content : styleDefinitions.content} >
						{this.props.children}
					</View>
				</View>
			</View>
		);
	}

	private onCloseButtonClicked() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}
}

const styles = (props: IProps) =>
	StyleSheet.create({
		container: {
			backgroundColor: SpontioColors.White,
			height: props.size ? props.size : '95%',
			margin: moderateScale(3),
			borderRadius: 10
		},
		modal: {
			flex: 1,
		},
		header: {
			paddingVertical: moderateScale(2),
			paddingHorizontal: moderateScale(20),
			flex: 2,
		},
		closeButton: {
			flex: 1,
			alignContent: 'flex-end'
		},
		titleContainer: {
			flex: 1,
		},
		icon: {
			marginVertical: moderateScale(10),
			alignSelf: 'flex-end',
			color: SpontioColors.LightGrayNoOpacity
		},
		title: {
			textAlign: 'left',
			textAlignVertical: 'top',
			fontSize: moderateScale(25),
			fontWeight: 'bold',
			color: SpontioColors.Primary,
			flex: 1
		},
		content: {
			marginTop: moderateScale(0),
			flex: 9,
			paddingHorizontal: moderateScale(20),
		},
		button: {
			paddingVertical: moderateScale(15),
			paddingHorizontal: moderateScale(20),
			margin: moderateScale(15),
			flexDirection: 'row',
			borderColor: SpontioColors.Primary,
			borderWidth: 1,
			backgroundColor: SpontioColors.Primary,
		},
		buttonText: {
			flex: 1,
			textAlign: 'center',
			color: SpontioColors.White,
			fontSize: moderateScale(14)
		},
		footer: {
			flex: 2,
			justifyContent: 'center'
		}
	});
