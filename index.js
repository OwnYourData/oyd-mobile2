/* eslint-disable no-undef */
import { init as initSentry } from '@sentry/react-native';
import initApp from './App';
import packageJSON from './package.json';

if (!__DEV__) {
	initSentry({
		dsn: 'https://c62993015ba14a1da34c1e10abe6aaf8:cd58e1bdc0254db293260e209967b649@sentry.io/1050784',
		release: `${packageJSON.name}@${packageJSON.version}`,
	});
}

initApp();

console.disableYellowBox = true; // eslint-disable-line
