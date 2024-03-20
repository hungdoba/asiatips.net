import React from 'react';

interface ButtonProps {
  content?: string;
  href: string;
  color: string;
}

export default function Button({ content, href, color }: ButtonProps) {
  const buttonColorClass = `bg-gradient-to-br from-green-400 to-${color}-600 hover:bg-gradient-to-bl`;

  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center w-full h-12 text-white ${buttonColorClass} focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
    >
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-100 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-50"></span>
      </span>
      <div className="animate-pulse">
        {content ? content : 'Đến trang đăng ký !'}
      </div>
    </button>
  );
}
