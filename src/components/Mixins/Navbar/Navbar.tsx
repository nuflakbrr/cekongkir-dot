'use client';
import { FC, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { headerNavLinks } from '@/data/headerNavLinks';
import { cn } from '@/lib/utils';
import UserNav from '@/components/Common/UserNav';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useAuth();
  const pathname = usePathname();

  // Navbar fixed position if scrolling
  useEffect(() => {
    window.onscroll = () => {
      const header = document.querySelector('header');
      const fixNav = header?.offsetTop ?? 0;

      if (window.pageYOffset > fixNav) {
        header?.classList.add(styles.navbarFixed);
      } else {
        header?.classList.remove(styles.navbarFixed);
      }
    };
  }, []);

  // Hamburger menu handler
  const hamburgerHandler = () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#navMenu');

    setIsOpen(!isOpen);

    if (isOpen) {
      hamburger?.classList.remove(styles.hamburgerActive);
      navMenu?.classList.add('hidden');
    } else {
      hamburger?.classList.add(styles.hamburgerActive);
      navMenu?.classList.remove('hidden');
    }
  };

  // isMenuActive handler
  const isMenuActive = (path: string) => {
    const isHomePage = pathname === '/' && path === '/';

    if (isHomePage) {
      return true;
    }

    return pathname !== '/' && path !== '/' && pathname.includes(path);
  };

  return (
    <header className="bg-transparent absolute top-0 left-0 w-full flex items-center z-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="px-4">
            <Link href="/" legacyBehavior>
              <a
                className="inline-flex items-center gap-2 font-primary font-bold text-xl lg:text-2xl py-6"
                aria-label="logo"
              >
                {/* <img
                    src="/apple-touch-icon.png"
                    alt="Brand Logo"
                    className="w-8 h-8 object-cover object-center"
                  /> */}
                Cek Ongkir
              </a>
            </Link>
          </div>
          <div className="flex items-center px-4">
            <button
              id="hamburger"
              name="hamburger"
              type="button"
              className="right-4 block absolute lg:hidden"
              onClick={hamburgerHandler}
            >
              <span
                className={`${styles.hamburgerLine} origin-top-left transition duration-300 ease-in-out`}
              ></span>
              <span
                className={`${styles.hamburgerLine} transition duration-300 ease-in-out`}
              ></span>
              <span
                className={`${styles.hamburgerLine} origin-bottom-left transition duration-300 ease-in-out`}
              ></span>
            </button>

            <nav
              id="navMenu"
              className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none"
            >
              <ul className="block lg:flex items-center">
                {headerNavLinks?.map((a, i) => (
                  <li className="group" key={i}>
                    <Link href={a.path} legacyBehavior>
                      <a
                        className={cn(
                          isMenuActive(a.path)
                            ? 'text-blue-500'
                            : 'text-black dark:text-white',
                          'font-secondary font-semibold text-base py-2 mx-8 lg:mx-2 flex group-hover:text-blue-500 transition duration-300 ease-in-out',
                        )}
                      >
                        {a.title}
                      </a>
                    </Link>
                  </li>
                ))}

                {!user ? (
                  <li className="group">
                    <Link href="/login" legacyBehavior>
                      <a
                        className={cn(
                          isMenuActive('/login')
                            ? 'text-blue-500'
                            : 'text-black dark:text-white',
                          'font-secondary font-semibold text-base py-2 mx-8 lg:mx-2 flex group-hover:text-blue-500 transition duration-300 ease-in-out',
                        )}
                      >
                        Masuk
                      </a>
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
            {user ? <UserNav /> : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
