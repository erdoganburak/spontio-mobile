import { AsyncStorage } from 'react-native';

/**
 * Manages storage actions.
 */
class StorageManagerInstance {

	/**
	* Sets item to storage.
	* 
	* @param key item key to set.
	* @param value item value to set.
	*/
	public async setItem(key: string, value: string) {
		await AsyncStorage.setItem(key, value);
	}

	/**
	* Gets item from storage.
	* 
	* @param key item key to get.
	* @param value item value to get.
	*/
	public async getItem(key: string) {
		return AsyncStorage.getItem(key);
	}

	/**
	* Removes item from storage.
	* 
	* @param key item key to remove.
	*/
	public async removeItem(key: string) {
		return AsyncStorage.removeItem(key);
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
