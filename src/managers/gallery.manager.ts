import store from "../redux/store";
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';
import { Role } from "../enums/role.enum";
import { showPictureSelectorModal } from "../redux/actions/pictureSelector";
import { changeUserProfilePicture, changeCompanyProfilePicture } from "../redux/actions/user";

const options: ImagePickerOptions = {
	title: 'Select Image',
	customButtons: [
		{
			name: 'customOptionKey',
			title: 'Choose file from Custom Option'
		},
	],
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};

class GalleryManagerInstance {

	/**
	* Opens gallery
	*/
	public openGallery(): void {
		let role = store.getState().sessionReducer.session.role;
		ImagePicker.launchImageLibrary(options, (response) => {
			 console.log(role);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else {
				if (role === Role.User) {
					store.dispatch(changeUserProfilePicture(response.uri));
				} else if (role === Role.Company) {
					store.dispatch(changeCompanyProfilePicture(response.uri));
				}
				store.dispatch(showPictureSelectorModal(false));
			}
		});
	}

}
const GalleryManager = new GalleryManagerInstance();
export default GalleryManager;
