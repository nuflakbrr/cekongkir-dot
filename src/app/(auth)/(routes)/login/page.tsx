import { FC } from 'react';

import ContainerLogin from '@/components/Containers/Auth/Login';

export const metadata = {
  title: 'Login - Cek Ongkir',
  description: 'Login ke Cek Ongkir',
};

const LoginPage: FC = () => {
  return <ContainerLogin />;
};

export default LoginPage;
