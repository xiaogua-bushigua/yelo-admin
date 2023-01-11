import cl from './index.module.scss';
import { useState, ChangeEvent, useRef, useEffect } from 'react';

type propsType = {
	inputType: string;
	mode: string;
	placeholder?: string;
	children?: JSX.Element;
	width?: string;
	notRequired?: boolean;
	defaultVal?: string;
	change?: (val: string) => void;
	borderStyle?: string;
	input?: string;
};

const Input = (props: propsType) => {
	let [pClass, setpClass] = useState(`${cl.InputTitle}`);
	let [inputClass, setinputClass] = useState(`${cl.Input}`);
	let [inputVal, setInputVal] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	let type: string = 'text';
	if (props.inputType == 'Password') type = 'password';

	useEffect(() => {
		if (props.defaultVal) {
			setInputVal(props.defaultVal);
			setpClass(`${cl.InputTitle} ${cl.TitleFocus}`);
			setinputClass(`${cl.Input} ${cl.InputFocus}`);
		}
    if(props.input=='') {
      setInputVal('');
			setpClass(`${cl.InputTitle}`);
			setinputClass(`${cl.Input}`);
    }
	}, [props.input]);

	// 聚焦
	const handleFocus = () => {
		setpClass(`${cl.InputTitle} ${cl.TitleFocus}`);
		setinputClass(`${cl.Input} ${cl.InputFocus}`);
	};
	// 失焦
	const handleBlur = () => {
		if (inputVal === '') {
			setpClass(`${cl.InputTitle}`);
			setinputClass(`${cl.Input}`);
		}
	};
	// 内容改变的回调
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputVal(event.target.value);
		props.change!(event.target.value);
	};
	const handleTitleClick = () => {
		inputRef.current?.focus();
	};

	return (
		<div className={cl.InputWrap} style={{ width: props.width }}>
			{props.mode == 'moveTitle' ? (
				<p className={pClass} onClick={handleTitleClick}>
					{props.inputType} {props.notRequired ? '' : '*'}
				</p>
			) : (
				''
			)}
			<form>
				<input
					ref={inputRef}
					type={type}
					value={inputVal}
					className={inputClass}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={handleChange}
					autoComplete="username"
					ng-hide="true"
					style={{
						paddingTop: props.mode === 'moveTitle' ? '24px' : '12px',
						paddingRight: props.mode === 'textIcon' ? '32px' : '0',
						borderBottom: props.borderStyle ? props.borderStyle : '',
					}}
					placeholder={props.placeholder}
				/>
			</form>
			<span className={cl.icon}>{props.children}</span>
		</div>
	);
};

export default Input;
