import { FC } from 'react';

import ContainerHome from '@/components/Containers/Home/Home';
import AuthenticatedPage from '@/middlewares/AuthenticatedPage';

const Home: FC = () => {
  return (
    <AuthenticatedPage>
      <ContainerHome />
    </AuthenticatedPage>
  );
};

export default Home;
