import { useEffect, useState, MouseEvent } from 'react';
import cl from './Calendar.module.scss';
import { Button, Calendar } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import dayjs from 'dayjs';

type propsType = {
	title: string;
	defaultDate?: string;
	width?: string;
  change?: (val:string) => void;
  date?: string;
};

const Calendar1 = (props: propsType) => {
	const [date, setDate] = useState(' 年 /月 /日');
	const [calendarCollapsed, setCalendarCollapsed] = useState(true);
  const [calendarVal, setCalendarVal] = useState(props.defaultDate)

	useEffect(() => {
		if (props.defaultDate) {
			setDate(
				props.defaultDate.split('-')[2] +
					'/' +
					props.defaultDate.split('-')[0] +
					'/' +
					props.defaultDate.split('-')[1]
			);
		}
    if(props.date=='') {
      setDate(' 年 /月 /日')
    }
	}, [props.date]);
  // 日历面板的上半部分改变
	const onPanelChange = (value: Dayjs, mode: CalendarMode) => {    
		setCalendarCollapsed(false);
	};
  // 日历面板的下半部分改变
	const handleDateChange = (value: Dayjs) => {
		setDate(value.format('YYYY/MM/DD'));
    props.change!(value.format('YYYY/MM/DD'))
    setCalendarVal(value.format('MM-DD-YYYY'))
	};
  // 收起日历
  document.addEventListener('click', () => {
		if (!calendarCollapsed) setCalendarCollapsed(true);
	});
  // 日历Icon点击
	const handleIconClick = (e: any) => {
		e.nativeEvent.stopImmediatePropagation();
		setCalendarCollapsed(!calendarCollapsed);
	};
  // 整块日历点击
	const handleCalendarClick = (e: MouseEvent) => {    
		e.nativeEvent.stopImmediatePropagation();
	};
	return (
		<div
			style={{ width: props.width }}
			className={`${cl.CalendarWrap} ${
				calendarCollapsed ? '' : cl.CalendarWrapOn
			} ${date !== ' 年 /月 /日' ? cl.CalendarWrapOn : ''}`}
		>
			<p
				className={`${cl.title} ${
					calendarCollapsed ? '' : cl.titleOn
				} ${date !== ' 年 /月 /日' ? cl.titleOn : ''}`}
			>
				{props.title}
			</p>
			<span className={cl.date}>{date}</span>
			<Button
				className={cl.icon}
				size="small"
				shape="circle"
				icon={<ScheduleOutlined />}
				onClick={handleIconClick}
			/>
			<div
				className={`${cl.calendar} ${
					calendarCollapsed ? '' : cl.calendarOn
				}`}
				onClick={handleCalendarClick}
			>``
				<Calendar
					fullscreen={false}
					onPanelChange={onPanelChange}
					onChange={handleDateChange}
					style={{ backgroundColor: '#fff' }}
					value={
						calendarVal
							? dayjs(calendarVal, 'MM-DD-YYYY')
							: dayjs()
					}
				/>
			</div>
		</div>
	);
};

export default Calendar1;
