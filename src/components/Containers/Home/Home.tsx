'use client';
import { FC } from 'react';

import TopSection from './components/TopSection';
import FormSection from './components/FormSection';

const ContainerHome: FC = () => {
  return (
    <section className="max-w-6xl mx-auto my-40 px-4">
      <TopSection />
      <FormSection />
    </section>
  );
};

export default ContainerHome;
