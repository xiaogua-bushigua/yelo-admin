import cl from './ReviewsList.module.scss';
import Avatar from 'react-avatar';
import { axiosDashReviews } from '@/store/modules/dashboard';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { setBread, setSelectedNaviKey } from '@/store/modules/global';
import generateColors from '@/utils/generateColors';

const ReviewsList = () => {
	const dispatch = useAppDispatch();
	const navigateTo = useNavigate();
	const info = useAppSelector((state) => state.dashboard.reviewsContent);
	useEffect(() => {
		dispatch(axiosDashReviews());
	}, []);
	return (
		<div className={cl.reviewsList}>
			{generateColors(info.length).map((color: string, index) => {
				return (
					<div
						className={cl.reviewWrap}
						key={color + 'wrap' + index}
						onClick={() => {
							localStorage.setItem('navigate', 'reviews');
							dispatch(setBread('reviews'));
							dispatch(setSelectedNaviKey('reviews'));
							navigateTo('/reviews');
						}}
					>
						<div className={cl.left}>
							<Avatar name={info[index].name} round size="42" color={color} key={color+'rev'} />
							<span className={cl.name}>{info[index].name.replace(' ', '')}</span>
						</div>
            <div className={cl.right}>
              {info[index].review}
            </div>
					</div>
				);
			})}
		</div>
	);
};

export default ReviewsList;
