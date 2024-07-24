'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { ComboBox } from '../Containers/Home/Home';

type Props = {
  type: 'Provinsi' | 'Kota';
  data: ComboBox[];
  value?: string | any;
  setValue: (val: string | any) => void;
  isDisabled?: boolean;
};

const Combobox: React.FC<Props> = ({
  type,
  data,
  value,
  setValue,
  isDisabled,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild disabled={isDisabled ? true : false}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data?.find((item) => item?.value === value)?.label
            : `Pilih ${type}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Pilih ${type}...`} />
          <CommandEmpty>Tidak ada {type} ditemukan.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value ? currentValue : item.value,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
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
  );
};

export default Combobox;
