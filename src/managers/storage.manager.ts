import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

/**
 * Manages storage actions.
 */
class StorageManagerInstance {

	/**
	* Sets item to storage.
	* 
	* @param key item key to set.
	* @param value item value to set.
	* @param secure use secure store.
	*/
	public async setItem(key: string, value: string, secure: boolean = false) {
		if (secure) {
			SecureStore.setItemAsync(key, value);
		} else {
			await AsyncStorage.setItem(key, value);
		}
	}

	/**
	* Gets item from storage.
	* 
	* @param key item key to get.
	* @param secure use secure store.
	*/
	public async getItem(key: string, secure: boolean = false) {
		if (secure) {
			return SecureStore.getItemAsync(key);
		} else {
			return AsyncStorage.getItem(key);
		}
	}

	/**
	* Removes item from storage.
	* 
	* @param key item key to remove.
	* @param secure use secure store.
	*/
	public async removeItem(key: string, secure: boolean = false) {
		if (secure) {
			return SecureStore.deleteItemAsync(key);
		} else {
			return AsyncStorage.removeItem(key);
		}
	}

	/**
	* Removes multiple items from storage.
	* 
	* @param keys item keys to remove.
	*/
	public async removeMultiItem(keys: string[]) {
		return AsyncStorage.multiRemove(keys);
	}

}

const StorageManager = new StorageManagerInstance();
export default StorageManager;
