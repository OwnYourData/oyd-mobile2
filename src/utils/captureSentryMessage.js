import {
	captureMessage,
	Severity,
} from '@sentry/react-native';
/**
 * Send errors to Sentry
 */
export const captureSentryMessage = args => captureMessage('Act On Api Error', {
	level: Severity.Info,
	message: { ...args }
});
