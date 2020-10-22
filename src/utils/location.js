import { Platform, PermissionsAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FusedLocation from 'react-native-fused-location';
import { captureSentryMessage } from './captureSentryMessage';
import BackgroundGeolocation from 'react-native-background-geolocation';

/**
 * Class to get location data
 */
export default class AppLocation {
	constructor() {
		this.watchID = null;
		this.isBackground = false;
	}

	unWatch() {
		if (Platform.OS === 'android') {
			FusedLocation.stopLocationUpdates();
			return;
		}
		if (this.watchID) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	}

	async init(isBackground: boolean = false) {
		try {
			this.isBackground = isBackground;
			if (Platform.OS === 'android') return this.androidPermissions();
			return this.watchLocation();
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'init isBackground method' });
			return { position: null, error };
		}
	}

	async watchLocation() {
		try {
			return new Promise(async (resolve) => {
				try {
					const { coords } = await BackgroundGeolocation.getCurrentPosition();
					resolve({ position: coords, error: null });
				}
				catch (error) {
					resolve({ position: null, error });
				}
			});
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'watchLocation method' });
			return { position: null, error };
		}
	}

	async androidPermissions() {
		try {
			const { type } = await NetInfo.fetch();

			const isConnected = (type !== 'none' && type !== 'unknown');
			let granted = null;
			if (!this.isBackground) {
				granted = await PermissionsAndroid.requestMultiple([
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
				]);
			}
			if ((granted &&
				granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' &&
				granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted') ||
				granted === true ||
				this.isBackground) {
				try {
					// Doesn't work when in airplane mode.
					if (!this.isBackground && isConnected) await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 });
					FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
					const position = await FusedLocation.getFusedLocation();
					return { position, error: null };
				} catch {
					/* catch potential errors on smartphones without google play services */
				}
			}
			return { position: null, error: true };
		} catch (error) {
			await captureSentryMessage({ error: JSON.stringify(error), message: 'androidPermissions method' });
			return { position: null, error };
		}
	}
}
