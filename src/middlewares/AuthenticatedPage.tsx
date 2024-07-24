'use client';
import { FC, ReactNode, useEffect } from 'react';
import { redirect } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/Common/Loader';

type Props = {
  children: ReactNode;
};

const AuthenticatedPage: FC<Props> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        description: 'Oops! Anda harus login terlebih dahulu.',
        variant: 'destructive',
      });
      localStorage.clear();
      redirect('/login');
    }
  }, [isLoading, toast, user]);

  if (!isLoading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Mengarahkan ke halaman login...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthenticatedPage;
