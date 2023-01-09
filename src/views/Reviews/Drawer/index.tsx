import React, { useState } from 'react';
import cl from './drawer.module.scss';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { StarFilled, CloseCircleFilled, SaveFilled } from '@ant-design/icons';
import { Button } from 'antd';
import Textarea from '@/components/Textarea';
import { saveData, delData, setSelectRowKeys } from '@/store/modules/reviews';
import guid from '@/utils/guid';

const colorPanel = {
	accepted: '#86C166',
	pending: '#E2943B',
	rejected: '#D0104C',
};

type propsType = {
  click: ()=>void
}

const DrawerDetail = (props: propsType) => {
  const dispatch = useAppDispatch()
	const selectedData = useAppSelector((state) => state.reviews.selectedData);
	const selectRowKeys = useAppSelector((state) => state.reviews.selectRowKeys);
  const [comment, setComment] = useState('')

  const onchange = (val: string) => {
    setComment(val)
  }
  const handleClickSave = () => {
    dispatch(saveData({key: selectedData.reviews_id, status: selectedData.status, comment: comment}))
    props.click()
  }
  const handleClickDel = () => {
    dispatch(delData(selectedData.reviews_id))
    let newSelectedKeys: React.Key[] = selectRowKeys.filter(item=>item !== selectedData.reviews_id)
    dispatch(setSelectRowKeys(newSelectedKeys))
    // 删除的同时关闭抽屉
    props.click()
  }
	return (
		<div className={cl.drawerWrap}>
			<div className={cl.infoWrap}>
				<div className={cl.infoDiv}>
					<div className={cl.item1}>
						<div className={cl.title}>Customer</div>
						<div className={cl.value}>{selectedData.customer}</div>
					</div>
					<div className={cl.item}>
						<div className={cl.title}>Product</div>
						<div className={cl.value}>{selectedData.product}</div>
					</div>
				</div>
				<div className={cl.infoDiv}>
					<div className={cl.item1}>
						<div className={cl.title}>Date</div>
						<div className={cl.value1}>{selectedData.date}</div>
					</div>
					<div className={cl.item}>
						<div className={cl.title}>Rating</div>
						<div className={cl.value1}>
							{new Array(Number(selectedData.rating))
								.fill('')
								.map((item) => (
									<StarFilled
										style={{ color: 'black' }}
										key={guid()}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
			<div className={cl.inputWrap}>
				<Textarea
					title="Comment"
					text={selectedData.comment}
          change={onchange}
				></Textarea>
			</div>
			<div className={cl.btnsWrap}>
				<Button
          onClick={handleClickSave}
					type="text"
					icon={<SaveFilled />}
					className={cl.btnIcon}
					style={{
						color: `${
							colorPanel[
								selectedData.status as keyof typeof colorPanel
							]
						}`,
					}}
				>
					Save
				</Button>
				<Button
          onClick={handleClickDel}
					type="text"
					danger
					icon={<CloseCircleFilled />}
					className={cl.btnIcon}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default DrawerDetail;
