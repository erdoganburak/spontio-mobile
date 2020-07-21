import store from "../redux/store";
import { showCamera, showTakenPicture, changePicture } from "../redux/actions/camera";

/**
 * Manages camera actions.
 */

class CameraManagerInstance {

	/**
	* Resets camera
	*/
	public resetCamera(): void {
		let camera = store.getState().cameraReducer.camera;
		console.log("Resetting camera...")
		// Close camera
		if (camera.showCamera) {
			store.dispatch(showCamera(false));
		}
		// Close picture viewer
		if (camera.showTakenPicture) {
			store.dispatch(showTakenPicture(false));
		}
		// Clear cache
		if (camera.picture) {
			store.dispatch(changePicture(null));
		}
	}

}
const CameraManager = new CameraManagerInstance();
export default CameraManager;
