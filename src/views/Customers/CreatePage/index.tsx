import cl from './createPage.module.scss';
import Input from '@/components/Input';
import Calendar from '@/components/Calendar';
import {
	EyeInvisibleOutlined,
	EyeOutlined,
	SaveFilled,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { customerType } from '@/types/customer';
import guid from '@/utils/guid';
import { createCustomer } from '@/store/modules/customers';
import { useAppDispatch } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

let reg = new RegExp('/', 'g');

const CreatePage = () => {
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()
  // 当前信息页能够保存时的样式控制
	const [saveClass, setSaveClass] = useState(false);
  // Input组件下划线
	const [borderStyle, setBorderStyle] = useState('');
  // 密码可不可见
	const [pwdShow, setPwdShow] = useState(false);
	const [pwdConfirmShow, setPwdConfirmShow] = useState(false);
  // 默认密码
	const [pwd, setPwd] = useState('1234');
	const [pwdConfirm, setPwdConfirm] = useState('');
  // antd的信息提示
	const [api, contextHolder] = notification.useNotification();

  // 初始信息
  const [savedInfo, setSavedInfo] = useState(
    {
      customerId: guid(),
      baseHistory: {
        firstSeen: new Date().toLocaleDateString().replace(reg, '-'),
        lastSeen: new Date().toLocaleDateString().replace(reg, '-'),
        ordersNum: 0,
      },
      ordersInfo: [],
      personalInfo: {
        firstName: '小瓜',
        lastName: '黄',
        email: 'mosimosi@xmail.com',
        phoneNumber: '741741741741',
        address: '翻斗大街翻斗花园二号楼1001室',
        province: '大唐',
        city: '',
        zipcode: '666666',
        originalPwd: '1234',
        birthday: '20220812'
      }
    } as customerType
  )

	const handleInputChange = (type: string, val: string) => {
		if (val === '') setSaveClass(false);
		else setSaveClass(true);
		switch (type) {
			case 'first':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, firstName: val}})
				break;
			case 'last':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, lastName: val}})
				break;
			case 'email':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, email: val}})
				break;
			case 'phone':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, phoneNumber: val}})
				break;
			case 'address':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, address: val}})
				break;
			case 'province':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, province: val}})
				break;
			case 'zipcode':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, zipcode: val}})
				break;
			case 'password':
        setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, originalPwd: val}})
				setPwd(val);
				break;
			case 'confirm password':
				setPwdConfirm(val);
				break;
			default:
				break;
		}
	};
	const handleCanlendarChange = (val: string) => {
    setSavedInfo({...savedInfo,personalInfo:{...savedInfo.personalInfo, birthday: val.replace(reg, '')}})
	};
  // 当隐藏/显示的icon被点击时
	const handlePwdClick = (val: string) => {
		if (val == 'pwd') setPwdShow(!pwdShow);
		else setPwdConfirmShow(!pwdConfirmShow);
	};
  // 保存
	const handleSaveClick = (placement: NotificationPlacement) => {
		if (saveClass) {
			if (pwd === pwdConfirm) {
				setBorderStyle('2px solid #4e3cc9');
        dispatch(createCustomer(savedInfo))
        navigateTo('/customers')
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
	return (
		<div>
			<div className={cl.personalInfoWrap}>
				<div className={cl.personalTitle}>Identity</div>
				<div className={cl.personalContent}>
					<div className={cl.contentLeft}>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									inputType="First Name"
									mode="moveTitle"
									width={'100%'}
									defaultVal={savedInfo.personalInfo.firstName}
									change={handleInputChange.bind(
										this,
										'first'
									)}
								/>
							</div>
							<div className={cl.item}>
								<Input
									inputType="Last Name"
									mode="moveTitle"
									width={'100%'}
									defaultVal={savedInfo.personalInfo.lastName}
									change={handleInputChange.bind(
										this,
										'last'
									)}
								/>
							</div>
						</div>
						<div className={cl.item} style={{ marginTop: 19 }}>
							<Input
								inputType="Email"
								mode="moveTitle"
								width={'100%'}
								notRequired
								defaultVal={savedInfo.personalInfo.email}
								change={handleInputChange.bind(this, 'email')}
							/>
						</div>
					</div>

					<div className={cl.contentRight}>
						<div className={cl.item}>
							<Calendar
								width="100%"
								title="Birthday"
								defaultDate={savedInfo.personalInfo.birthday.slice(4,6)+'-'+savedInfo.personalInfo.birthday.slice(6,8)+'-'+savedInfo.personalInfo.birthday.slice(0,4)}
								change={handleCanlendarChange}
							></Calendar>
						</div>
						<div className={cl.item}>
							<Input
								inputType="Phone number"
								mode="moveTitle"
								width={'100%'}
								defaultVal={savedInfo.personalInfo.phoneNumber}
								change={handleInputChange.bind(this, 'phone')}
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
								inputType="Address"
								mode="moveTitle"
								width={'100%'}
								defaultVal={savedInfo.personalInfo.address}
								change={handleInputChange.bind(this, 'address')}
							/>
						</div>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									inputType="Province"
									mode="moveTitle"
									width={'100%'}
									defaultVal={'大唐'}
									change={handleInputChange.bind(
										this,
										'province'
									)}
								/>
							</div>
							<div className={cl.item}>
								<Input
									inputType="Zipcode"
									mode="moveTitle"
									width={'100%'}
									notRequired
									defaultVal={savedInfo.personalInfo.zipcode}
									change={handleInputChange.bind(
										this,
										'zipcode'
									)}
								/>
							</div>
						</div>
					</div>

					<div className={cl.contentRight}></div>
				</div>

				<div className={cl.personalTitle} style={{ marginTop: 36 }}>
					Password
				</div>
				<div className={cl.personalContent}>
					<div className={cl.contentLeft}>
						<div style={{ display: 'flex' }}>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(
										this,
										'password'
									)}
									inputType={pwdShow ? 'text' : 'Password'}
									placeholder="Password"
									mode="textIcon"
									width="100%"
									borderStyle={borderStyle}
									defaultVal={pwd}
								>
									{pwdShow ? (
										<EyeOutlined
											className={cl.inputIcon}
											onClick={handlePwdClick.bind(
												this,
												'pwd'
											)}
										/>
									) : (
										<EyeInvisibleOutlined
											className={cl.inputIcon}
											onClick={handlePwdClick.bind(
												this,
												'pwd'
											)}
										/>
									)}
								</Input>
							</div>
							<div className={cl.item}>
								<Input
									change={handleInputChange.bind(
										this,
										'confirm password'
									)}
									inputType={
										pwdConfirmShow ? 'text' : 'Password'
									}
									placeholder="Confirm Password"
									mode="textIcon"
									width="100%"
									borderStyle={borderStyle}
								>
									{pwdConfirmShow ? (
										<EyeOutlined
											className={cl.inputIcon}
											onClick={handlePwdClick.bind(
												this,
												'confirmPwd'
											)}
										/>
									) : (
										<EyeInvisibleOutlined
											className={cl.inputIcon}
											onClick={handlePwdClick.bind(
												this,
												'confirmPwd'
											)}
										/>
									)}
								</Input>
							</div>
						</div>
					</div>
					<div className={cl.contentRight}></div>
				</div>
			</div>
			<div className={cl.divider}></div>
			<div className={cl.btnWrap}>
				<Button
					type="text"
					icon={<SaveFilled />}
					className={saveClass ? cl.saveActived : cl.saveIcon}
					onClick={handleSaveClick.bind(this, 'bottomRight')}
				>
					Save
				</Button>
			</div>
			{contextHolder}
		</div>
	);
};

export default CreatePage;
