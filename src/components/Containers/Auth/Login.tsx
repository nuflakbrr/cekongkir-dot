'use client';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ContainerLogin: FC = () => {
  const { toast } = useToast();
  const { setUser } = useAuth();
  const router = useRouter();

  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  });

  type LoginFormValues = z.infer<typeof formSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (dataSubmit: LoginFormValues) => {
    try {
      if (
        dataSubmit.username === 'user' &&
        dataSubmit.password === 'password'
      ) {
        setUser({
          ...dataSubmit,
          name: 'Naufal Akbar Nugroho',
        });
        router.refresh();
        router.push('/');
        toast({
          description: 'Login Sukses! Selamat Datang Kembali',
          variant: 'success',
        });
      } else {
        toast({
          description: 'Oops! Username atau Password Salah!',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({ description: 'Something went wrong.', variant: 'destructive' });
    }
  };

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="container">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="w-full px-4 mx-5 mb-10 lg:mb-0 lg:w-1/2">
              <img
                src="/assets/svg/undraw_login.svg"
                loading="lazy"
                alt="Hero Illustration"
                className="object-cover object-center w-full h-full"
              />
            </div>

            <div className="w-full px-4 mx-5 lg:w-1/2">
              <div className="w-full max-w-md">
                <Card>
                  <CardHeader className="flex flex-col items-center justify-center mx-auto">
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        width="95"
                        height="94"
                        viewBox="0 0 95 94"
                        className="w-6 h-auto text-blue-500"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                      </svg>
                      <span className="text-3xl font-bold">Cek Ongkir</span>
                    </CardTitle>
                    <CardDescription>
                      Isi formulir berikut untuk masuk.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  placeholder="Username"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  type="password"
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          disabled={!isValid || isSubmitting}
                          className="w-full bg-blue-500 dark:text-white hover:bg-blue-600"
                          type="submit"
                        >
                          Masuk
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerLogin;
