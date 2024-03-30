import { MDXRemote } from 'next-mdx-remote';
import { useTranslation } from 'next-i18next';

interface TableOfContentsProps {
  content: any;
  hidden: boolean;
  setHidden: any;
}

const TableOfContents = ({
  content,
  hidden,
  setHidden,
}: TableOfContentsProps) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setHidden();
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed top-0 left-0 right-0 h-screen overflow-auto z-50 bg-gray-900 bg-opacity-75 p-4 pt-24 ${
        hidden ? 'hidden md:block' : ''
      } md:relative md:h-auto md:p-0 md:bg-transparent`}
    >
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow md:m-0">
        <h1 className="mb-2 text-lg font-bold text-gray-900">
          {t('title:newPostFollow')}
        </h1>
        <hr />
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
  );
};

export default TableOfContents;
