/* eslint-disable prettier/prettier */
import { FC, useCallback, useEffect, useState } from 'react';
import { Check, ChevronsUpDown, DollarSign, Truck } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAxios } from '@/hooks/useAxios';
import { useToast } from '@/components/ui/use-toast';
import { Province } from '@/interfaces/province';
import { City } from '@/interfaces/city';
import { CheckResult } from '@/interfaces/results';
import { ComboBox } from '@/interfaces/combobox';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CheckInfo from './CheckInfo';
import ServiceInfo from './ServiceInfo';

const FormSection: FC = () => {
  // General State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State for collect data Province
  const [dataProvince, setDataProvince] = useState<Province[]>([]);

  // State for collect data City Origin value
  const [dataCityOrigin, setDataCityOrigin] = useState<City[]>([]);

  // State for collect data City Destination value
  const [dataCityDestination, setDataCityDestination] = useState<City[]>([]);

  // Trigger state update for data City Origin
  const [fetchingCityOrigin, setFetchingCityOrigin] = useState<boolean>(false);

  // Trigger state update for data City Destination
  const [fetchingCityDestination, setFetchingCityDestination] = useState<boolean>(false);

  // State for collect result cost check
  const [checkResult, setCheckResult] = useState<CheckResult[]>();
  const [resultCityOrigin, setResultCityOrigin] = useState<City | undefined>();
  const [resultCityDestination, setResultCityDestination] = useState<City | undefined>();

  // Define hooks
  const { toast } = useToast();
  const axios = useAxios();

  // Define form schema
  const formSchema = z.object({
    province_origin: z.string().min(1, { message: 'Asal Provinsi harus ada.' }),
    province_destination: z.string().min(1, { message: 'Provinsi Tujuan harus ada.' }),
    origin: z.string().min(1, { message: 'Asal Kota harus ada.' }),
    destination: z.string().min(1, { message: 'Kota Tujuan harus ada.' }),
    weight: z.string().min(1, { message: 'Berat harus ada.' }),
    courier: z.string().min(1, { message: 'Kurir harus ada.' }),
  });

  // Define type form values
  type FormValues = z.infer<typeof formSchema>;

  // Define defualt value form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      province_origin: '',
      province_destination: '',
      origin: '',
      destination: '',
      weight: '',
      courier: '',
    },
  });

  // Fetching data Province
  const fetchProvince = useCallback(async () => {
    try {
      const { data } = await axios.get('province');
      setDataProvince(data.data.rajaongkir.results);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  }, [axios]);

  // Fetching data City
  const fetchCity = useCallback(
    async (
      province: string,
      setDataCity: React.Dispatch<React.SetStateAction<City[]>>,
      setFetchingCity: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      try {
        const { data } = await axios.get(`city?province=${province}`);
        setDataCity(data.data.rajaongkir.results);
        setFetchingCity(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setFetchingCity(false);
      }
    },
    [axios],
  );

  // Implement fetch data Province
  useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  // Implement fetch data City Origin, the trigger is form.watch for data Province (Origin)
  useEffect(() => {
    if (form.watch('province_origin')) {
      setFetchingCityOrigin(true);
      fetchCity(
        form.watch('province_origin'),
        setDataCityOrigin,
        setFetchingCityOrigin,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('province_origin'), fetchCity, setDataCityOrigin, setFetchingCityOrigin]);

  // Implement fetch data City Origin, the trigger is form.watch for data Province (Destination)
  useEffect(() => {
    if (form.watch('province_destination')) {
      setFetchingCityDestination(true);
      fetchCity(
        form.watch('province_destination'),
        setDataCityDestination,
        setFetchingCityDestination,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('province_destination'), fetchCity, setDataCityDestination, setFetchingCityDestination]);

  // Formatted response data Province for Combobox Component
  const formattedProvince: ComboBox[] = dataProvince.map((item) => ({
    value: item.province_id,
    label: item.province,
  }));

  // Formatted response data City Origin for Combobox Component
  const formattedCityOrigin: ComboBox[] = dataCityOrigin.map((item) => ({
    value: item.city_id,
    label: `${item.type} ${item.city_name}`,
  }));

  // Formatted response data City Destination for Combobox Component
  const formattedCityDestination: ComboBox[] = dataCityDestination.map((item) => ({
    value: item.city_id,
    label: `${item.type} ${item.city_name}`,
  }));

  // Handle submit form
  const onSubmit = async (dataSubmit: FormValues) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('cost', dataSubmit);
      setCheckResult(data.data.rajaongkir.results);
      setResultCityOrigin(data.data.rajaongkir.origin_details);
      setResultCityDestination(data.data.rajaongkir.destination_details);
      toast({ description: data.message, variant: 'success' });
    } catch (error) {
      toast({
        description: 'Oops! Terjadi kesalahan.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-between mb-5 gap-3 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div>
              <h1>Dari mana</h1>

              <div className="flex items-center justify-between gap-2 mt-2 w-full">
                <FormField
                  control={form.control}
                  name="province_origin"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild disabled={isLoading}>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-[250px] justify-between',
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
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] p-0">
                            <Command>
                              <CommandInput placeholder="Cari Provinsi..." />
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
                                        form.setValue(
                                          'province_origin',
                                          item.value,
                                        );
                                        setFetchingCityOrigin(true);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
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
                          <PopoverTrigger
                            asChild
                            disabled={isLoading || fetchingCityOrigin}
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-[250px] justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? formattedCityOrigin.find(
                                  (item) => item?.value === field.value,
                                )?.label
                                : 'Pilih Kota'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] p-0">
                            <Command>
                              <CommandInput placeholder="Cari Kota..." />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada Kota ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedCityOrigin.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue('origin', item.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
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
              </div>
            </div>

            <div>
              <h1>Mau ke mana</h1>

              <div className="flex items-center justify-between gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="province_destination"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild disabled={isLoading}>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-[250px] justify-between',
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
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] p-0">
                            <Command>
                              <CommandInput placeholder="Cari Provinsi..." />
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
                                        form.setValue(
                                          'province_destination',
                                          item.value,
                                        );
                                        setFetchingCityDestination(true);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
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
                          <PopoverTrigger
                            asChild
                            disabled={isLoading || fetchingCityDestination}
                          >
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-[250px] justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value
                                ? formattedCityDestination.find(
                                  (item) => item?.value === field.value,
                                )?.label
                                : 'Pilih Kota'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] p-0">
                            <Command>
                              <CommandInput placeholder="Cari Kota..." />
                              <CommandList>
                                <CommandEmpty>
                                  Tidak ada Kota ditemukan.
                                </CommandEmpty>
                                <CommandGroup>
                                  {formattedCityDestination.map((item) => (
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
                                          'mr-2 h-4 w-4',
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
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-3 w-full">
            <div className="w-full">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Berat dalam gram"
                        disabled={isLoading}
                        className="placeholder:line-clamp-1 placeholder:text-ellipsis"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="courier"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Kurir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jne">
                            Jalur Nugraha Ekakurir (JNE)
                          </SelectItem>
                          <SelectItem value="pos">POS Indonesia</SelectItem>
                          <SelectItem value="tiki">
                            Citra Van Titipan Kilat (TIKI)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full mt-3">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sedang Memuat...' : 'Cek Sekarang!'}
            </Button>
          </div>
        </form>
      </Form>

      {checkResult ? (
        <Card>
          <CardHeader className="">
            <CardTitle className="flex items-center gap-2">
              <DollarSign />
              <span className="text-2xl font-bold">Hasil Cek Ongkir</span>
            </CardTitle>
            <CardDescription>
              Berikut adalah hasil cek ongkir dari{' '}
              {resultCityOrigin?.type} {resultCityOrigin?.city_name} ke
              {resultCityDestination?.type} {resultCityDestination?.city_name}.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CheckInfo
              resultCityDestination={resultCityDestination}
              resultCityOrigin={resultCityOrigin}
            />

            <div className="flex items-center gap-2 my-4">
              <Truck />
              <span className="text-2xl font-bold">Layanan Tersedia</span>
            </div>

            <ServiceInfo checkResult={checkResult} />
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export default FormSection;
