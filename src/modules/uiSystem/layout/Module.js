import React from 'react';
import {
	Alert,
	View,
} from 'react-native';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import Orientation from 'react-native-orientation';
import Toast from 'react-native-easy-toast';
import { Navigation } from 'react-native-navigation';

import { Header, HeaderVert } from '../';

const errorHandler = (e, isFatal) => {
	if (isFatal) {
		Alert.alert(
			'Unexpected JS Exception error occurred',
			`Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}\nWe will need to restart the app.`,
			[{ text: 'Restart', onPress: () => RNRestart.Restart() }]
		);
	} else {
		console.log(e);
	}
};

setJSExceptionHandler(errorHandler);

type Props = {
	navigator:mixed,
	children:any,
	spring?:boolean,
	noFadeIn?:boolean,
	showIconButton?:boolean,
	hideFooter?:boolean,
	showVersion?:boolean,
	showHeader?:boolean,
	showBack?:boolean,
	i18n:mixed,
	onScreenChangedEvent:void,
	onPressIconButton?:void,
	props:mixed,
	headerTitle?:string,
	toastMessage?:string,
	showToastMessage?:boolean
};

class ModuleLayout extends React.Component<Props> {
	constructor(props:Props) {
		super(props);
		this.state = {
			error: false,
			showHeader: true,
			showVertHeader: false,
		};
		this.props = props;
		this.toast = null;

		// we only track "appear" events here
		// previously, this was events with id 'willAppear'
		// if necessary, we should also register for registerComponentDidDisappearListener
		// or other events -> https://wix.github.io/react-native-navigation/api/events/
		Navigation.events().registerComponentDidAppearListener(this.onNavigatorEvent);
	}

	componentDidMount() {
		Orientation.addOrientationListener(this.onOrientationChanged);
		this.checkOrientation();
	}

	componentWillReceiveProps(nextProps) {
		/*	if (nextProps.core.get('route').key === 'AUTH' && this.props.auth.get('credentials').value === null && nextProps.auth.get('credentials').value) {
				console.log(this.props);
				this.props.onEncryptCredentials({
					nonce: nextProps.auth.get('credentials').nonce,
					cipher: nextProps.auth.get('credentials').value,
				});
			} */

		if (nextProps.core.get('route').key !== 'AUTH' &&
			!nextProps.core.get('user').get('access_token')
		) {
			this.props.onRootSingleScreenApp({ key: 'AUTH' });
		}
	}

	componentDidUpdate(nextProps) {
		this.checkOrientation();

		if (!('event' in this.props.core.get('scene'))) return;

		this.checkErrors();
		if (nextProps.showToastMessage) this.showToast();
	}

	componentWillUnmount() {
		Orientation.removeOrientationListener(this.onOrientationChanged);
	}

	onNavigatorEvent = (component) => {
		const name = component.componentName.split('.')[1];
		this.props.onScreenChangedEvent({ key: name, });
	};

	onPressBackBtn = () => {
		const { showBack } = this.props;

		if (showBack) {
			this.props.popRoute(this.props);
		}
	};

	onOrientationChanged = (orientation) => {
		let showVertHeader = false;

		if (orientation === 'LANDSCAPE' && this.isSceneSupportingVertHeader()) {
			showVertHeader = true;
		}

		this.setState({
			showHeader: !showVertHeader,
			showVertHeader,
		});
	};

	checkOrientation = () => {
		Orientation.getOrientation((err, orientation) => this.onOrientationChanged(orientation));
	}

	isSceneSupportingVertHeader = () => {
		const { key } = this.props.core.get('scene');

		return key === 'DASHBOARD/APP_DETAIL';
	}

	showToast = () => this.toast.show(this.props.toastMessage, 1000);

	update = () => this.checkErrors();

	checkErrors = () => {
		if (this.props.core.showError && !this.state.error) {
			const {
				status, message, error, type
			} = this.props.core.errorMessage;
			this.setState({ error: true }, this.props.routeTo(
				this.props,
				'CORE/ERROR',
				{
					error, status, message, type
				}
			));
		}
	};

	getViewStyle = () => {
		const style = {
			flex: 1,
			backgroundColor: '#fff',
		};

		if (this.state.showVertHeader) {
			style.flexDirection = 'row';
		}

		return style;
	}

	render() {
		return (
			<View style={this.getViewStyle()}>
				{this.state.showVertHeader &&
					<HeaderVert
						title={this.props.headerTitle}
						showBack={this.props.showBack}
						showIconButton={this.props.showIconButton}
						onPress={this.onPressBackBtn}
						onPressIconButton={this.props.onPressIconButton}
					/>}
				{this.state.showHeader && this.props.showHeader &&
					<Header
						title={this.props.headerTitle}
						showBack={this.props.showBack}
						showIconButton={this.props.showIconButton}
						onPress={this.onPressBackBtn}
						onPressIconButton={this.props.onPressIconButton}
					/>}
				<View style={{ flex: 1 }}>
					{this.props.children}
					<Toast
						ref={(toast) => {
							this.toast = toast;
						}}
					/>
				</View>
			</View>
		);
	}
}

ModuleLayout.defaultProps = {
	onPressIconButton: () => (true),
	showBack: false,
	showIconButton: false,
	showHeader: false,
	spring: false,
	noFadeIn: false,
	hideFooter: false,
	showVersion: false,
	headerTitle: '',
	toastMessage: '',
	showToastMessage: false
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ModuleLayout);
