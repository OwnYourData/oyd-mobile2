import React from 'react';
import { TextField } from 'react-native-material-textfield';
import * as UI from '../';
import normalize from '../helpers/normalize';

class ReactPureComponent extends React.PureComponent {
	routeTo = key => this.props.onRootSingleScreenApp({ key, passProps: { white: true }, animationType: 'fade' });

	renderInput = (label, value, field, secureTextEntry = false, error = false) =>
		<TextField
			textColor='#000000'
			baseColor={error ? '#FF0000' : '#000000'}
			fontSize={normalize(14)}
			labelFontSize={normalize(14)}
			label={this.props.i18n.t(label)}
			value={value.replace(/ /g, '')}
			autoCorrect={false}
			spellCheck={false}
			keyboardType={field === 'email' ? 'email-address' : 'default'}
			secureTextEntry={secureTextEntry}
			onChangeText={text => this.props.onChangeLoginInput({ text, field })}
		/>;

	renderButton = (text, onPress, type = 'primary', disabled = false) =>
		<UI.Button
			disabled={disabled}
			onPress={onPress}
			type={type}
			text={this.props.i18n.t(text)}
		/>;
}

export default ReactPureComponent;
