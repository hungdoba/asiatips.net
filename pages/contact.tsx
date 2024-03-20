import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SEO from '@/components/Layout/SEO';
import Navbar from '@/components/Layout/Navbar';
import SocialMedia from '@/components/Common/SocialMedia';
import Footer from '@/components/Layout/Footer';
import Alert from '@/components/Widget/Alert';

export const getStaticProps = async (context: any) => {
  const locale = context.locale;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [alertVisible, setAlertVisible] = useState(false);

  const { t } = useTranslation();

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      setName('');
      setEmail('');
      setMessage('');
      showAlert();
    } catch (error) {
      console.error('Error saving email to the database:', error);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Our Team"
        description="Have a question or comment? Contact our team today to learn more about our services and how we can help you. We would love to hear from you!"
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/contact"
      />
      <Navbar />
      <div className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6">{t('title:contact')}</h1>
        <p className="mb-8">{t('common:sharing')}</p>
        <form>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="name"
            >
              {t('common:fullName')}
              <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={handleNameChange}
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              id="name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              {t('common:email')}
              <span className="text-red-500">*</span>
            </label>
            <input
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              value={email}
              onChange={handleEmailChange}
              id="email"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-medium text-gray-700 mb-2"
              htmlFor="message"
            >
              {t('common:message')}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              className="border border-gray-400 rounded-lg px-4 py-2 w-full h-32"
              id="message"
              value={message}
              onChange={handleMessageChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              onClick={sendMessage}
            >
              {t('button:send')}
            </button>
          </div>
        </form>
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4">
            {t('common:otherContactWay')}
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> info@Asiatips.net
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Fanpage:</strong> facebook.com/Asiatips
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Line:</strong> line.com/Asiatips
          </p>
        </div>
      </div>
      <SocialMedia />
      <div className="flex justify-center mt-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium border-blue-400 border p-4 hover:bg-blue-100 rounded-lg"
        >
          {t('button:backHomepage')}
        </Link>
      </div>
      {alertVisible && (
        <Alert type="info" message={t('common:thanksForQuestion')} />
      )}
      <Footer />
    </>
  );
}
