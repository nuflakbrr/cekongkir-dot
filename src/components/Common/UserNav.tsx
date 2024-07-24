'use client';
import { FC, Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const UserNav: FC = () => {
  const { user, logout } = useAuth();

  return (
    <Menu as="div" className="relative lg:ml-3 mr-11">
      <MenuButton className="flex text-sm">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="capitalize">
            {user && user.name && user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg">
          <MenuItem>
            <button
              onClick={() => logout()}
              className="flex items-center min-w-full px-4 py-2 text-sm text-gray-700"
            >
              <FaSignOutAlt className="mt-1 mr-2" />
              Keluar
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserNav;
