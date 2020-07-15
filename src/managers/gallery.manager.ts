import store from "../redux/store";
import ImagePicker from 'react-native-image-picker';
import { Role } from "../enums/role.enum";
import { changeUserProfilePicture } from "../redux/actions/user";
import { showPictureSelectorModal } from "../redux/actions/pictureSelector";

/**
 * Manages gallery actions.
 */
class GalleryManagerInstance {

	/**
	* Opens gallery
	*
	* @param role To know who opened the gallery.
	*/
	public openGallery(role: Role): void {

		let options = {
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

        // Open Image Library
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
				switch (role) {
					case Role.User:
                        store.dispatch(changeUserProfilePicture(response.uri));
                        store.dispatch(showPictureSelectorModal(false))
						break;
					default:
						break;
				}
            }
        });
        
	}

}

const GalleryManager = new GalleryManagerInstance();
export default GalleryManager;
