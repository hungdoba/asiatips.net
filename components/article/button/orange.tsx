export default function ButtonOrange({ content, href }) {
  return (
    <button
      onClick={() => window.open(href, '_blank')}
      className="w-full h-12 justify-center text-lg text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2"
    >
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-100 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-50"></span>
      </span>
      <div>{content ? content : "Let's go!"}</div>
    </button>
  );
}
