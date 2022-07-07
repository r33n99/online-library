import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { Footer } from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;