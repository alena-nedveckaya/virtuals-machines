import { Outlet } from 'react-router-dom';
import { Header } from '@/components';
import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
