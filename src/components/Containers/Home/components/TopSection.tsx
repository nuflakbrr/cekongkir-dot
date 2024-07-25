import { FC } from 'react';

import Heading from '@/components/Common/Heading';

const TopSection: FC = () => {
  return (
    <div className="w-full mb-10">
      <Heading
        title="Cek Ongkir"
        description="Cek Ongkir Dulu, Baru CheckOut"
      />
    </div>
  );
};

export default TopSection;
