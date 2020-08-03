import Toast from 'react-native-root-toast';
import { SpontioColors } from '../enums/spontioColors.enum';

/**
 * Manages toast actions.
 */

class ToastManagerInstance {

	/**
	* Shows warning
	* 
	* @param message message to show.
	*/
	public showWarning(message: string) {
		this.showToast(message, SpontioColors.Warning);
	}

	/**
	* Shows success
	* 
	* @param message message to show.
	*/
	public showSuccess(message: string) {
		this.showToast(message, SpontioColors.Success);
	}

	/**
	* Shows info
	* 
	* @param message message to show.
	*/
	public showInfo(message: string) {
		this.showToast(message, SpontioColors.Info);
	}

	/**
	* Shows danger
	* 
	* @param message message to show.
	*/
	public showDanger(message: string) {
		this.showToast(message, SpontioColors.Danger);
	}


	/**
	* Shows toast
	* 
	* @param message message to show.
	* @param color background color
	*/
	private showToast(message: string, color: SpontioColors): void {
		let toast = Toast.show(message, {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 0,
			backgroundColor: color,
			onShow: () => {
				// calls on toast\`s appear animation start
			},
			onShown: () => {
				// calls on toast\`s appear animation end.
			},
			onHide: () => {
				// calls on toast\`s hide animation start.
			},
			onHidden: () => {
				// calls on toast\`s hide animation end.
			}
		});
	}

}
const ToastManager = new ToastManagerInstance();
export default ToastManager;
