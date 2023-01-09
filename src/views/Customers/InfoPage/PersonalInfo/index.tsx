import { useState } from 'react';
import cl from './personalInfo.module.scss';
import Input from '@/components/Input';
import Calendar from '@/components/Calendar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { EyeInvisibleOutlined, EyeOutlined, DeleteFilled, SaveFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { saveModifiedData, delModifiedData } from '@/store/modules/customers';
import { useNavigate } from 'react-router-dom';

const getProperDate = (val: string) => val.slice(4, 6) + '-' + val.slice(6, 8) + '-' + val.slice(0, 4);

interface savedItemsType {
	[key: string]: string;
}

const PersonalInfo = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	// 在table页点击的行数据
	const clickedRowData = localStorage.getItem('customerClickedTableData')
		? JSON.parse(localStorage.getItem('customerClickedTableData')!).data
		: useAppSelector((state) => state.customers.clickedTableData);
	// Input下划线
	const [borderStyle, setBorderStyle] = useState('');
	// 模态框所需
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	// 密码显示
	const [pwdShow, setPwdShow] = useState(false);
	const [pwdConfirmShow, setPwdConfirmShow] = useState(false);
	// 保存按钮在可/不可保存时的样式
	const [saveClass, setSaveClass] = useState(`${cl.botIcons} ${cl.saveIcon}`);
	// 待保存的项
	const [savedItems, setSavedItems] = useState({
		customer_id: clickedRowData.customerId,
		firstName: clickedRowData.personalInfo.firstName,
		lastName: clickedRowData.personalInfo.lastName,
		phoneNumber: clickedRowData.personalInfo.phoneNumber,
		address: clickedRowData.personalInfo.address,
	} as savedItemsType);

	// 密码的显示与否
	const handlePwdClick = (val: string) => {
		if (val == 'pwd') setPwdShow(!pwdShow);
		else setPwdConfirmShow(!pwdConfirmShow);
	};
	// 个人信息Input内容改变时
	const handleInputChange = (type: string, val: string) => {
		setSavedItems({ ...savedItems, [type]: val });
		setSaveClass(`${cl.botIcons} ${cl.saveIcon} ${cl.saveActived}`);
	};
	// 日历改变时
	const handleCanlendarChange = (val: string) => {
		let reg = new RegExp('/', 'g');
		setSavedItems({ ...savedItems, birthday: val.replace(reg, '') });
		setSaveClass(`${cl.botIcons} ${cl.saveIcon} ${cl.saveActived}`);
	};
	// 保存
	const handleSaveClick = (placement: NotificationPlacement) => {
		if (saveClass === `${cl.botIcons} ${cl.saveIcon} ${cl.saveActived}`) {
			if (savedItems.password == savedItems['confirm password']) {
				setBorderStyle('2px solid #4e3cc9');
				dispatch(saveModifiedData(savedItems));
				navigateTo('/customers');
			} else {
				setBorderStyle('2px solid #D0104C');
				api.error({
					message: `修改信息提示`,
					description: '两次密码不一致！',
					placement,
				});
			}
		}
	};
	// 删除
	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};
	// 模态框
	const handleOk = () => {
		setIsModalOpen(false);
		dispatch(delModifiedData(clickedRowData.customerId));
		navigateTo('/customers');
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<div className={cl.personalInfoWrap}>
				<div className={cl.personalTitle}>Identity</div>
				<div className={cl.personalContent}>
					<div className={cl.contentLeft}>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'firstName')}
									inputType="First Name"
									mode="moveTitle"
									width={'100%'}
									defaultVal={clickedRowData.personalInfo.firstName}
								/>
							</div>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'lastName')}
									inputType="Last Name"
									mode="moveTitle"
									width={'100%'}
									defaultVal={clickedRowData.personalInfo.lastName}
								/>
							</div>
						</div>
						<div className={cl.item} style={{ marginTop: 19 }}>
							<Input
								change={handleInputChange.bind(this, 'email')}
								inputType="Email"
								mode="moveTitle"
								width={'100%'}
								notRequired
								defaultVal={clickedRowData.personalInfo.email}
							/>
						</div>
					</div>

					<div className={cl.contentRight}>
						<div className={cl.item}>
							<Calendar
								width="100%"
								title="Birthday"
								defaultDate={getProperDate(clickedRowData.personalInfo.birthday)}
								change={handleCanlendarChange}
							></Calendar>
						</div>
						<div className={cl.item}>
							<Input
								change={handleInputChange.bind(this, 'phoneNumber')}
								inputType="Phone number"
								mode="moveTitle"
								width={'100%'}
								defaultVal={clickedRowData.personalInfo.phoneNumber}
							/>
						</div>
					</div>
				</div>

				<div className={cl.personalTitle} style={{ marginTop: 36 }}>
					Address
				</div>
				<div className={cl.personalContent}>
					<div className={cl.contentLeft}>
						<div className={cl.item}>
							<Input
								change={handleInputChange.bind(this, 'address')}
								inputType="Address"
								mode="moveTitle"
								width={'100%'}
								defaultVal={clickedRowData.personalInfo.address}
							/>
						</div>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'province')}
									inputType="Province"
									mode="moveTitle"
									width={'100%'}
									defaultVal={clickedRowData.personalInfo.province}
								/>
							</div>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'zipcode')}
									inputType="Zipcode"
									mode="moveTitle"
									width={'100%'}
									notRequired
									defaultVal={clickedRowData.personalInfo.zipcode}
								/>
							</div>
						</div>
					</div>

					<div className={cl.contentRight}></div>
				</div>

				<div className={cl.personalTitle} style={{ marginTop: 36 }}>
					Change Password
				</div>
				<div className={cl.personalContent}>
					<div className={cl.contentLeft}>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'password')}
									inputType={pwdShow ? 'text' : 'Password'}
									placeholder="Password"
									mode="textIcon"
									width="100%"
									borderStyle={borderStyle}
								>
									{pwdShow ? (
										<EyeOutlined className={cl.inputIcon} onClick={handlePwdClick.bind(this, 'pwd')} />
									) : (
										<EyeInvisibleOutlined className={cl.inputIcon} onClick={handlePwdClick.bind(this, 'pwd')} />
									)}
								</Input>
							</div>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(this, 'confirm password')}
									inputType={pwdConfirmShow ? 'text' : 'Password'}
									placeholder="Confirm Password"
									mode="textIcon"
									width="100%"
									borderStyle={borderStyle}
								>
									{pwdConfirmShow ? (
										<EyeOutlined className={cl.inputIcon} onClick={handlePwdClick.bind(this, 'confirmPwd')} />
									) : (
										<EyeInvisibleOutlined className={cl.inputIcon} onClick={handlePwdClick.bind(this, 'confirmPwd')} />
									)}
								</Input>
							</div>
						</div>
					</div>
					<div className={cl.contentRight}></div>
				</div>
			</div>
			<div className={cl.btnWrap}>
				<Button onClick={handleSaveClick.bind(this, 'bottomRight')} type="text" icon={<SaveFilled />} className={saveClass}>
					Save
				</Button>

				<Button type="text" icon={<DeleteFilled />} className={`${cl.botIcons} ${cl.deleteIcon}`} onClick={handleDeleteClick}>
					Delete
				</Button>
			</div>
			<Modal title="删除提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<p>你确定要删除此条信息吗？</p>
			</Modal>
			{contextHolder}
		</div>
	);
};

export default PersonalInfo;
