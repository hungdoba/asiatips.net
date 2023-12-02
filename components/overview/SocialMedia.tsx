import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="m-8 flex items-center justify-center">
      <div className="mr-4 text-blue-400 hover:text-green-500 cursor-pointer">
        <Link href="https://www.facebook.com/asiatips.net" target="_blank">
          <FaFacebook size={32} />
        </Link>
      </div>
      <div className="mr-4 text-blue-600 hover:text-green-500 cursor-pointer">
        <Link href="https://twitter.com/asiatips_net" target="_blank">
          <FaTwitter size={32} />
        </Link>
      </div>
      <div className="text-red-600 hover:text-green-500 cursor-pointer">
        <Link
          href="https://www.instagram.com/asiatips.official/"
          target="_blank"
        >
          <FaInstagram size={32} />
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
