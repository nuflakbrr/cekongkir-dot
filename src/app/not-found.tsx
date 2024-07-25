import { FC } from 'react';

import ContainerNotFound from '@/components/Containers/ErrorPage/NotFound';

export const metadata = {
  title: 'Halaman Tidak Ditemukan - Cek Ongkir',
  description: 'Halaman tidak ditemukan',
};

const NotFound: FC = () => {
  return <ContainerNotFound />;
};

export default NotFound;
