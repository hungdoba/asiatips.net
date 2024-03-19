import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import LanguageToggle from '../Common/LanguageToggle';

const NAVIGATION_LINKS = [
  { href: '/tips', label: 'link:tips' },
  { href: '/travel', label: 'link:travel' },
  { href: '/gallery', label: 'link:gallery' },
  { href: '/contact', label: 'link:contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const currentUrl = router.asPath.split('/')[1];

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleSearch = () => {
    router.push(`/search?searchTerm=${searchTerm}`);
  };

  return (
    <nav className="w-full top-0 border-b fixed backdrop-blur-sm text-black z-10">
      <div className="w-full container mx-auto max-w-7xl flex flex-wrap items-center justify-between py-3">
        <label
          onClick={toggleMenu}
          className="cursor-pointer lg:hidden block mr-4 order-2"
        >
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>

        <div className="order-1">
          <Link href="/" className="flex items-center tracking-wide">
            <Image
              width={120}
              height={240}
              src="/logo.png"
              className="mr-3 lg:h-22 lg:w-42"
              alt="Asiatips logo"
            />
          </Link>
        </div>

        <div
          className={`lg:flex lg:items-center lg:w-auto w-full order-3 ${
            openMenu ? '' : 'hidden'
          }`}
        >
          <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0 px-4">
            {NAVIGATION_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`inline-block no-underline hover:text-green-900 py-2 md:pl-16 ${
                    currentUrl === href.substring(1)
                      ? 'text-blue-600 font-bold'
                      : ''
                  }`}
                >
                  {t(label)}
                </Link>
              </li>
            ))}
            <li>
              <div className="flex flex-row relative order-3 lg:order-2 flex-grow-0 md:pl-16">
                <input
                  className="w-full pl-4 border border-gray-300 h-10 rounded-lg text-sm focus:outline-none"
                  name="search"
                  aria-label="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="sim"
                />
                <MagnifyingGlassIcon
                  onClick={handleSearch}
                  className="absolute right-16 top-3 w-4 h-4 hover:cursor-pointer"
                />
                <div className="ml-2">
                  <LanguageToggle />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
