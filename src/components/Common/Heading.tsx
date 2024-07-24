import { FC } from 'react';
import { Heading as HeadingProps } from '@/interfaces/heading';

const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      <p className="text-xl text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
