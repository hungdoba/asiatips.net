import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function Admin() {
  const { t } = useTranslation();

  return (
    <div className="w-full mb-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow md:m-0">
        <div className="flex flex-col items-center py-8">
          <Image
            className="w-16 h-16 rounded-full"
            height={100}
            width={100}
            sizes="25vw"
            src="/admin.png"
            alt="Admin logo"
          />
          <h1 className="mb-1 text-xl font-medium text-gray-900 ">Hung Ba</h1>
          <span className="text-sm text-gray-500 mb-2">
            {t('aboutme:jobTitle')}
          </span>
          <span className="text-sm text-gray-500 ">
            {t('aboutme:shotBackground')}
          </span>
          <span className="text-sm text-gray-500">{t('aboutme:shotJob')}</span>
          <span className="mb-2 text-sm text-gray-500">
            {t('aboutme:hobby')}
          </span>
          <span className="text-sm text-gray-500">{t('aboutme:welcome')}</span>
          <span className="text-sm text-gray-500">
            {t('aboutme:blogOverview')}
          </span>
          <span className="text-sm text-gray-500"></span>
          <div className="flex space-x-3 mt-4">
            <Link
              href="/about"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t('button:readMore')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
