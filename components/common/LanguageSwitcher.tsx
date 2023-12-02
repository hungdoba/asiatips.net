import { i18n } from 'next-i18next';
import { useRouter } from 'next/router';

function LanguageSwitcher() {
  let lang = i18n?.language;
  const router = useRouter();
  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  const handleClick = () => {
    if (lang === 'vi') {
      onLanguageChange('ja');
    } else {
      onLanguageChange('vi');
    }
  };

  return lang == 'ja' ? (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 512 512"
      className="hover: cursor-pointer"
    >
      <mask id="circleFlagsVn0">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#circleFlagsVn0)">
        <path fill="#d80027" d="M0 0h512v512H0z" />
        <path
          fill="#ffda44"
          d="m256 133.6l27.6 85H373L300.7 271l27.6 85l-72.3-52.5l-72.3 52.6l27.6-85l-72.3-52.6h89.4z"
        />
      </g>
    </svg>
  ) : lang == 'vi' ? (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 512 512"
      className="hover: cursor-pointer"
    >
      <mask id="circleFlagsJp0">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#circleFlagsJp0)">
        <path fill="#eee" d="M0 0h512v512H0z" />
        <circle cx="256" cy="256" r="111.3" fill="#d80027" />
      </g>
    </svg>
  ) : (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 512 512"
      className="hover: cursor-pointer"
    >
      <mask id="circleFlagsUs0">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#circleFlagsUs0)">
        <path
          fill="#eee"
          d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z"
        />
        <path
          fill="#d80027"
          d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"
        />
        <path fill="#0052b4" d="M0 0h256v256H0Z" />
        <path
          fill="#eee"
          d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z"
        />
      </g>
    </svg>
  );
}

export default LanguageSwitcher;
