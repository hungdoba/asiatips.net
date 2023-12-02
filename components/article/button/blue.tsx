export default function ButtonBlue({ content, href }) {
  return (
    <button
      onClick={() => (window.location = href)}
      className="flex items-center justify-center w-full h-12 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
