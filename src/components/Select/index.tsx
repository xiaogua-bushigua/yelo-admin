import cl from './Select.module.scss';
import { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type propsType = {
	item: string;
	list: string[];
	width: string;
	change?: (val: string) => void;
  defaultVal?: string; 
  height?: number;
  titleHeight?: number;
};

const Select = (props: propsType) => {
	const [inputVal, setInputVal] = useState(props.defaultVal?props.defaultVal:'');
	const [pClass, setpClass] = useState(props.defaultVal?`${cl.SelectTitle} ${cl.TitleFocus}`:`${cl.SelectTitle}`);
	const [selectClass, setSelectClass] = useState(props.defaultVal?`${cl.Select} ${cl.SelectFocus}`:`${cl.Select}`);
	const [selectCollapsed, setSelectCollapsed] = useState(true);
	const inputRef = useRef<HTMLInputElement>(null);

	// 聚焦
	const handleFocus = () => {
		setpClass(`${cl.SelectTitle} ${cl.TitleFocus}`);
		setSelectClass(`${cl.Select} ${cl.SelectFocus}`);
	};
	// 失焦
	const handleBlur = () => {
		if (inputVal === '') {
			setpClass(`${cl.SelectTitle}`);
			setSelectClass(`${cl.Select}`);
		}
	};
	// 选择后的内容变化
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputVal(String(event.target.value));
		props.change!(event.target.value);
	};
	// 选择组件的点击
	const handleSelectClick = (e: MouseEvent) => {
		e.nativeEvent.stopImmediatePropagation();
		setSelectCollapsed(!selectCollapsed);
	};
	const handleTitleClick = () => {
		inputRef.current?.focus();
	};
	// 选项的点击
	const handleItemClick = (event: any) => {
		event.target.value = event.target.innerHTML;
		handleChange(event);
		inputRef.current?.focus();
	};
	document.addEventListener('click', () => {
		if (!selectCollapsed) setSelectCollapsed(true);
	});
	return (
		<div
			className={cl.SelectWrap}
			onClick={handleSelectClick}
			style={{ width: props.width + 'px' , height: props.height + 'px'}}
		>
			<p className={pClass} onClick={handleTitleClick} style={{top: props.titleHeight + 'px'}}>
				{props.item}
			</p>
			<input
				ref={inputRef}
				value={inputVal}
				className={selectClass}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
			<Button
				className={`${cl.selectIcon} ${
					selectCollapsed ? '' : cl.selectIconRotate
				}`}
				size="small"
				shape="circle"
				icon={<CaretDownOutlined />}
			/>
			<div
				className={`${cl.selectItems} ${
					selectCollapsed ? '' : cl.selectItemsOpen
				}`}
				style={
					selectCollapsed
						? {
								transform: `translateY(${
									(20 + props.list.length * 30) / 2
								}px) scale(0)`,
						  }
						: {
								transform: `translateY(${
									props.list.length <= 10
										? 20 + props.list.length * 30
										: 320
								}px) scale(1)`,
						  }
				}
			>
				{props.list.map((item: string) => {
					return (
						<div
							className={cl.selectItem}
							onClick={handleItemClick}
							key={item}
						>
							{item}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Select;
