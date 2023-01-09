import cl from './infoPage.module.scss';
import HistoryInfo from './HistoryInfo';
import PersonalInfo from './PersonalInfo';

const Info = () => {
	return (
		<div className={cl.infoPageWrap}>
			<div className={cl.leftWrap}>
        <PersonalInfo></PersonalInfo>
      </div>
			<div className={cl.rightWrap}>
        <HistoryInfo></HistoryInfo>
      </div>
		</div>
	);
};

export default Info;
