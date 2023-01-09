import { Outlet } from 'react-router-dom';
import SideNavi from '@/components/layout/sideNavi';
import TopHeader from '@/components/layout/topHeader';
import cl from './home.module.scss';
import { useAppSelector } from '@/store/hooks';

const Home = () => {
	const contentClass = useAppSelector((state) => state.global.contentClass);

  return (
    <div className={cl.home}>
      <div className={cl.top}>
        <TopHeader></TopHeader>
      </div>
      <div className={cl.contentWrap}>
        <SideNavi></SideNavi>
        <div className={`${cl.content} ${cl[contentClass]}`}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Home;
