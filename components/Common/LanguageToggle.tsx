import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

function LanguageToggle() {
  const { t } = useTranslation();
  const router = useRouter();
  const [lang, setLang] = useState(router?.locale || 'en'); // Use state to track the language

  // Function to handle language change
  const handleLanguageChange = (newLocale: string) => {
    setLang(newLocale); // Update language state
    router.push(router.asPath, undefined, { locale: newLocale }); // Update router locale
  };

  // Render the correct flag SVG based on the language
  const renderFlag = () => {
    // Determine the correct flag SVG based on the language
    switch (lang) {
      case 'ja':
        return (
          <svg
            onClick={() => handleLanguageChange('vi')}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 512 512"
            className="hover:cursor-pointer"
          >
            {/* SVG code for Japanese flag */}
          </svg>
        );
      case 'vi':
        return (
          <svg
            onClick={() => handleLanguageChange('ja')}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 512 512"
            className="hover:cursor-pointer"
          >
            {/* SVG code for Vietnamese flag */}
          </svg>
        );
      default:
        return (
          <svg
            onClick={() => handleLanguageChange('en')}
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 512 512"
            className="hover:cursor-pointer"
          >
            {/* SVG code for English flag */}
          </svg>
        );
    }
  };

  return renderFlag(); // Render the flag SVG
}

export default LanguageToggle;
