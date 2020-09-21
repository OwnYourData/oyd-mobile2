import { Navigation } from 'react-native-navigation';
import { name } from '../../app.json';
import { width } from '../utils/index';

export default class {
	static routeTo = (props, key, passProps = {}) => {
		Navigation.push(props.componentId, {
			component: {
				name: `${name}.${key}`,
				passProps,
			},
		});
	};

	static popRoute = (props) => Navigation.pop(props.componentId);

	static startSingleScreenApp = (key, animationType = 'slide-down', passProps = {}) => {
		Navigation.setDefaultOptions({
			topBar: {
				visible: false,
				height: 0,
			},
			sideMenu: {
				left: {
					visible: false,
					enabled: true
				}
			},
		});
		Navigation.setRoot({
			root: {
				stack: {
					children: [
						{
							component: {
								name: `${name}.${key}`,
							}
						}
					]
				}
			}
		});
	};

	static showModal = (key, passProps) => (
		Navigation.showModal({
			screen: `${name}.${key}`,
			passProps,
			animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
		})
	);

	static dismissModal = () => (Navigation.dismissModal({ animationType: 'slide-down' }));

	static dismissAllModals = () => (Navigation.dismissAllModals({ animationType: 'slide-down' }));
}
