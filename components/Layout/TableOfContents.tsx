import { MDXRemote } from 'next-mdx-remote';
import { useTranslation } from 'next-i18next';

interface TableOfContentsProps {
  content: any;
  isPopupMode: boolean;
  isPopup: boolean;
  setHidden: any;
}

const TableOfContents = ({
  content,
  isPopupMode,
  isPopup,
  setHidden,
}: TableOfContentsProps) => {
  const { t } = useTranslation();
  return (
    <div
      tabIndex={-1}
      className={`${isPopupMode && !isPopup && 'hidden'} ${
        isPopup &&
        'fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 p-4 border-gray-500'
      } w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full `}
    >
      <div className="relative w-full max-w-lg max-h-full md:mx-auto">
        <div className="relative bg-white rounded-lg shadow border">
          <div className="flex items-center justify-between p-5 border-b rounded-t ">
            <h3 className="text-xl font-medium text-gray-900 ">
              {t('common:tableOfContent')}
            </h3>
            {isPopup && (
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                data-modal-hide="medium-modal"
                onClick={setHidden}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only"> Đóng</span>
              </button>
            )}
          </div>
          <div className="p-6 space-y-6">
            <MDXRemote
              {...content}
              components={{
                a: ({ href, ...props }) => (
                  <a
                    onClick={setHidden}
                    id={href}
                    href={href}
                    className="block py-1 hover:text-green-700 rounded-lg"
                    {...props}
                  />
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
