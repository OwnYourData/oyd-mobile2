import React from 'react';
import { Modal, View } from 'react-native';
import { has, set } from 'lodash';
import QRCodeScanner from 'react-native-qrcode-scanner';

import storeVaultUrl from '../utils/';
import * as UI from '../../uiSystem/';

class ScanQR extends React.PureComponent {
	onSuccess = async (e) => {
		try {
			this.setModalVisible();

			let stringToParse = e.data;
			// new versions (>= 2) do have the version flag
			// and there is at least one field (password or password2) that contains the password as urlencoded string
			const isNewVersion = /"version"/.test(stringToParse);

			if (isNewVersion) {
				// if password2 is there, we have to remove original password field as it is not urlencoded and could cause problems while parsing
				stringToParse = stringToParse.replace(/"password"\s*:\s*".*"\s*,\s*"password2"/, '"password2"');
			}

			const obj = {
				PIA_URL: '',
				email: '',
				password: '',
				...JSON.parse(stringToParse),
			};

			if (obj.password2) {
				// new version of password -> url encoded, so it does also support special characters
				obj.password = obj.password2;
				delete obj.password2;
			}

			if (isNewVersion) { obj.password = decodeURIComponent(obj.password); }

			this.props.onParseQrCode({ obj });

			this.props.onShowLogin({ showLogin: true });
			this.props.onShowQr({ showQr: false });

			if (obj.PIA_URL !== '' && obj.email !== '' && obj.password !== '') {
				const { email, password, PIA_URL } = obj;
				const vaultUrl = await storeVaultUrl(PIA_URL);
				if (!vaultUrl) return;

				setTimeout(() => this.props.onGetOauthToken({ email, password, isFetching: true }), 1000);
			}
		} catch (err) {
			this.props.onError({ status: 0, message: 'error on scanning qr code', type: 'n/a' });
		}
	};

	setModalVisible = () => this.props.onStartQrScan({ startQrScan: false });

	render = () => (
		<Modal
			onRequestClose={() => true}
			animationType='slide'
			transparent={false}
			visible={this.props.startQrScan}
		>
			<UI.CenterView fullHeight pad={20}>
				<QRCodeScanner
					showMarker
					checkAndroid6Permissions
					onRead={this.onSuccess.bind(this)}
					ref={(scanner) => {
						this.scanner = scanner;
					}}
				/>
				<View style={{ width: '100%', alignItems: 'center' }}>
					<UI.Block wdth='80%'>
						<UI.Button
							onPress={this.setModalVisible}
							type='primary'
							text={this.props.i18n.t('auth.cancelScan')}
						/>
					</UI.Block>
				</View>
			</UI.CenterView>
		</Modal>);
}

export default ScanQR;
