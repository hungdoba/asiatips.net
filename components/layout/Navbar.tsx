import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useTranslation } from 'next-i18next';

import LangugeSwitcher from '../common/LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  let url = router.asPath.split('/')[1];

  const handleSearch = (searchTerm: string) => {
    router.push(`/search?searchTerm=${searchTerm}`);
  };

  function toggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <nav className="w-full top-0 border-b fixed backdrop-blur-sm bg-white/60 lg:bg-white/80 text-black z-10">
      <div className="w-full container mx-auto max-w-7xl flex flex-wrap items-center justify-between py-3">
        <label
          onClick={() => toggleMenu()}
          className="cursor-pointer lg:hidden block mr-4 order-2"
        >
          <svg
            className="fill-current "
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
          <Link className="flex items-center tracking-wide" href="/">
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
            !openMenu && 'hidden'
          }`}
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0 px-4">
              <li>
                <Link
                  className={`inline-block no-underline hover:text-green-900 py-2 md:pl-16 ${
                    url === 'tips' && 'text-blue-600 font-bold'
                  }`}
                  href="/tips"
                >
                  {t('link:tips')}
                </Link>
              </li>
              <li>
                <Link
                  className={`inline-block no-underline hover:text-green-900 py-2 md:pl-16 ${
                    url === 'travel' && 'text-blue-600 font-bold'
                  }`}
                  href="/travel"
                >
                  {t('link:travel')}
                </Link>
              </li>
              <li>
                <Link
                  className={`inline-block no-underline  hover:text-green-900 py-2 md:pl-16 ${
                    url === 'gallery' && 'text-blue-600 font-bold'
                  }`}
                  href="/gallery"
                >
                  {t('link:gallery')}
                </Link>
              </li>
              <li>
                <Link
                  className={`inline-block no-underline  hover:text-green-900 py-2 md:pl-16 ${
                    url === 'contact' && 'text-blue-600 font-bold'
                  }`}
                  href="/contact"
                >
                  {t('link:contact')}
                </Link>
              </li>
              <li>
                <div className="flex flex-row relative order-3 lg:order-2 flex-grow-0 md:pl-16">
                  <input
                    className="w-full pl-4 border border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none"
                    name="search"
                    aria-label="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="sim"
                  />
                  <MagnifyingGlassIcon
                    onClick={() => handleSearch(searchTerm)}
                    className="absolute right-16 top-3 w-4 h-4 hover:cursor-pointer"
                  />
                  <div className="ml-2">
                    <LangugeSwitcher />
                  </div>
                </div>
              </li>
              <li></li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
}
