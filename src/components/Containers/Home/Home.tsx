/* eslint-disable indent */
'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAxios } from '@/hooks/useAxios';
import { useToast } from '@/components/ui/use-toast';
import { Province } from '@/interfaces/province';
import { City } from '@/interfaces/city';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Heading from '@/components/Common/Heading';
// import Combobox from '@/components/ui/combobox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ComboBox = {
  value: string | any;
  label: string;
};

const ContainerHome: FC = () => {
  const [dataProvince, setDataProvince] = useState<Province[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set Province & City From (A)
  const [dataCityA, setDataCityA] = useState<City[]>([]);
  const [fetchingCityA, setFetchingCityA] = useState<number>(0);

  // Set Province & City To (B)
  const [dataCityB, setDataCityB] = useState<City[]>([]);
  const [fetchingCityB, setFetchingCityB] = useState<number>(0);

  const { toast } = useToast();
  const axios = useAxios();

  const formSchema = z.object({
    province_a: z.string().min(1, {
      message: 'Asal Provinsi harus ada.',
    }),
    province_b: z.string().min(1, {
      message: 'Provinsi Tujuan harus ada.',
    }),
    origin: z.string().min(1, {
      message: 'Asal Kota harus ada.',
    }),
    destination: z.string().min(1, {
      message: 'Kota Tujuan harus ada.',
    }),
    weight: z.string().min(1, {
      message: 'Berat harus ada.',
    }),
    courier: z.string().min(1, {
      message: 'Kurir harus ada.',
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      province_a: '',
      province_b: '',
      origin: '',
      destination: '',
      weight: '',
      courier: '',
    },
  });

  const fetchProvince = useCallback(async () => {
    try {
      const { data } = await axios.get('province');
      setDataProvince(data.data.rajaongkir.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  }, [axios]);

  const fetchCityA = useCallback(async () => {
    // if (form.watch('province_a') !== '' && fetchingCityA !== 1) return;

    try {
      const { data } = await axios.get(
        `city?province=${form.watch('province_a')}`,
      );
      setDataCityA(data.data.rajaongkir.results);
      setFetchingCityA(1);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, form.watch('province_a')]);

  const fetchCityB = useCallback(async () => {
    // if (form.watch('province_b') !== '' && fetchingCityB !== 1) return;

    try {
      const { data } = await axios.get(
        `city?province=${form.watch('province_b')}`,
      );
      setDataCityB(data.data.rajaongkir.results);
      setFetchingCityB(1);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, form.watch('province_b')]);

  useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  const formattedProvince: ComboBox[] = dataProvince.map((item) => ({
    value: item.province_id,
    label: item.province,
  }));

  const formattedCityA: ComboBox[] = dataCityA.map((item) => ({
    value: item.city_id,
    label: item.type + ' ' + item.city_name,
  }));

  const formattedCityB: ComboBox[] = dataCityB.map((item) => ({
    value: item.city_id,
    label: item.type + ' ' + item.city_name,
  }));

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      // if (form.watch('province_a') !== '' && fetchingCityA !== 1) return;
      // if (form.watch('province_b') !== '' && fetchingCityB !== 1) return;

      if (value.province_a !== '' && fetchingCityA !== 1) {
        fetchCityA();
      }

      if (value.province_b !== '' && fetchingCityB !== 1) {
        fetchCityB();
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCityA, fetchCityB, form.watch]);

  // useEffect(() => {
  //   const subscription = form.watch((value, { province_a, string }) => {
  //     if (value !== '') {
  //       fetchCityA();
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchCityA, form.watch('province_a')]);

  // useEffect(() => {
  //   const subscription = form.watch((value, { province_b, string }) => {
  //     if (value !== '') {
  //       fetchCityB();
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchCityB, form.watch('province_b')]);

  const onSubmit = async (dataSubmit: FormValues) => {
    setIsLoading(true); // Set loading state to true
    try {
      const { data } = await axios.post('user', dataSubmit);
      toast({ description: data.message, variant: 'success' });
    } catch (error) {
      toast({ description: 'Something went wrong.', variant: 'destructive' });
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="w-full mb-10">
        <Heading
          title="Cek Ongkir"
          description="Cek Ongkir Dulu, Baru CheckOut"
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-between gap-3"
        >
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div>
              <h1>Dari mana</h1>

              <div className="flex items-center justify-between gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="province_a"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? formattedProvince.find(
                                      (item) => item?.value === field.value,
                                    )?.label
                                  : 'Pilih Provinsi'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari Provinsi..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada provinsi ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedProvince.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue('province_a', item.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          item.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? formattedCityA.find(
                                      (item) => item?.value === field.value,
                                    )?.label
                                  : 'Pilih Kota'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari Kota..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada Kota ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedCityA.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue('origin', item.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          item.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Combobox
                          type="Provinsi"
                          data={formattedProvince}
                          value={valProvinceA}
                          setValue={setValProvinceA}
                        /> */}

                {/* <Combobox
                  type="Kota"
                  data={formattedCityA}
                  value={valCityA}
                  setValue={setValCityA}
                  isDisabled={!valProvinceA ? true : false}
                /> */}
              </div>
            </div>

            <div>
              <h1>Kemana</h1>

              <div className="flex items-center justify-between gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="province_b"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? formattedProvince.find(
                                      (item) => item?.value === field.value,
                                    )?.label
                                  : 'Pilih Provinsi'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari Provinsi..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada provinsi ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedProvince.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue('province_b', item.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          item.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? formattedCityB.find(
                                      (item) => item?.value === field.value,
                                    )?.label
                                  : 'Pilih Kota'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Cari Kota..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada Kota ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedCityB.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue(
                                          'destination',
                                          item.value,
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          item.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Combobox
                  type="Kota"
                  data={formattedCityB}
                  value={valCityB}
                  setValue={setValCityB}
                  isDisabled={!valProvinceB ? true : false}
                /> */}
              </div>
            </div>

            <div className="w-full">
              <h1>Berat (gr)</h1>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full">
              <h1>Kurir</h1>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="courier"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Kurir" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jne">JNE</SelectItem>
                            <SelectItem value="tiki">TIKI</SelectItem>
                            <SelectItem value="pos">Pos Indonesia</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex items-end justify-end">
            <Button type="submit">Cek Sekarang!</Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ContainerHome;
