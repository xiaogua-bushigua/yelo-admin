import { useEffect } from 'react';
import cl from './textarea.module.scss';
import { useState, useRef, ChangeEvent } from 'react';

type propsType = {
  text: string,
  title: string,
  change: (val:string)=>void
}

const Textarea = (props: propsType) => {
	let [textareaVal, setTextareaVal] = useState(props.text);
	let [pClass, setpClass] = useState(`${cl.TextareaTitle}`);
	let [textareaClass, settextareaClass] = useState(`${cl.Textarea}`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{
    setTextareaVal(props.text)
  },[props.text])

	const handleFocus = () => {
		setpClass(`${cl.TextareaTitle} ${cl.TitleFocus}`);
		settextareaClass(`${cl.Textarea} ${cl.TextareaFocus}`);
	};
	const handleBlur = () => {
			setpClass(`${cl.TextareaTitle}`);
			settextareaClass(`${cl.Textarea}`);
	};
	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setTextareaVal(event.target.value);
    props.change(event.target.value)
	};
	const handleTitleClick = () => {
		textareaRef.current?.focus();
	};
	return (
		<div className={cl.TextareaWrap}>
			<p className={pClass} onClick={handleTitleClick}>
				{props.title}
			</p>
			<textarea
				value={textareaVal}
				className={textareaClass}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
				name=""
				id=""
				cols={30}
				rows={12}
				ref={textareaRef}
			></textarea>
		</div>
	);
};

export default Textarea;
