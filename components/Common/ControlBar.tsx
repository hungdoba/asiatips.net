import Link from 'next/link';
import { signOut } from 'next-auth/react';
// import { NewArticle } from '@/utils/types';
import { ChangeEvent, useRef, useState } from 'react';
import { convert } from '@/utils/slugify';
import Dropdown from '../Control/Dropdown';
import { post, post_translation } from '@prisma/client';

export default function ControlBar({
  newArticle,
  translations,
  onNewArticleChange,
  onTranslationChanged,
  onLanguageChange,
  isUpdateMode,
}: {
  newArticle: post;
  translations: post_translation[];
  onNewArticleChange: any;
  onTranslationChanged: any;
  onLanguageChange: any;
  isUpdateMode: boolean;
}) {
  const handleMainInformationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    let newInformation;

    const newValue = event.target.value;
    newInformation = {
      ...newArticle,
      [fieldName]: newValue,
    };

    onNewArticleChange(newInformation);
  };

  const handleTranslateInformationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    // find content index
    const index = translations.findIndex(
      (x: post_translation) => x.language_code == selectedLanguage
    );

    // found
    if (index != -1) {
      const updatedTranslations = [...translations];
      updatedTranslations[index] = {
        ...updatedTranslations[index],
        [fieldName]: event.target.value,
      };
      onTranslationChanged(updatedTranslations);
    } else {
      console.error("Translation with language_code 'vi' not found");
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async function () {
        const imageData = reader.result;

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageData }),
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const data = await response.json();
          console.log('Image uploaded successfully:', data.imageURL);
          const newInformation = {
            ...newArticle,
            ['imageUrl']: data.imageURL,
          };
          onNewArticleChange(newInformation);

          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Upload failed.');
        }
      };
    }
  };

  const autoCreateTableOfContent = () => {
    const headings = translations
      .find((x: post_translation) => x.language_code == selectedLanguage)
      ?.markdown.match(/^(#+)(.*)/gm);

    if (!headings || headings.length === 0) {
      return 'No headings found.';
    }

    let toc = '';
    headings.forEach((heading: string) => {
      const matchResult = heading.match(/^#+/);
      if (matchResult) {
        const level = matchResult[0].length;
        const text = heading.replace(/^#+\s*/, '');
        const slug = text.toLowerCase().replace(/\s+/g, '-').replace('.', '');
        toc += `${'  '.repeat(level - 1)}- [${text}](#${slug})\n`;
      }
    });

    // find content index
    const index = translations.findIndex(
      (x: post_translation) => x.language_code == selectedLanguage
    );

    // found
    if (index != -1) {
      const updatedTranslations = [...translations];
      updatedTranslations[index] = {
        ...updatedTranslations[index],
        tableOfContents: toc,
      };
      onTranslationChanged(updatedTranslations);
    } else {
      console.error("Translation with language_code 'vi' not found");
    }
  };

  const createArticle = async () => {
    if (newArticle.image == undefined || newArticle.image == '') {
      alert('There are no image');
      return;
    }

    const formData = new FormData();
    formData.append('url', newArticle.url);
    formData.append('category', newArticle.category);
    formData.append('tags', newArticle.tags.toString());
    formData.append('image', newArticle.image);
    formData.append('active', String(newArticle.active));

    const viTranslation = translations.find(
      (x: post_translation) => x.language_code === 'vi'
    );
    const jaTranslation = translations.find(
      (x: post_translation) => x.language_code === 'ja'
    );

    formData.append('viTitle', String(viTranslation?.title));
    formData.append('viBrief', String(viTranslation?.brief));
    formData.append(
      'viTableOfContents',
      String(viTranslation?.tableOfContents)
    );
    formData.append('viMarkdown', String(viTranslation?.markdown));

    formData.append('jaTitle', String(jaTranslation?.title));
    formData.append('jaBrief', String(jaTranslation?.brief));
    formData.append(
      'jaTableOfContents',
      String(jaTranslation?.tableOfContents)
    );
    formData.append('jaMarkdown', String(jaTranslation?.markdown));

    let method = isUpdateMode ? 'PUT' : 'POST';

    const response = await fetch('/api/post/create', {
      method: method,
      body: formData,
    });
    const result = await response.json();

    if (!response.ok) {
      alert(`Error: ${result.message}`);
      return;
    }

    if (isUpdateMode) {
      alert('Updated');
      return;
    } else {
      window.open(
        `${convert(newArticle.category)}/${newArticle.url}`,
        '_blank'
      );
    }
  };

  function handleCheckboxChange(event: { target: { checked: any } }) {
    const isChecked = event.target.checked;
    const newInformation = {
      ...newArticle,
      active: isChecked,
    };
    onNewArticleChange(newInformation);
  }

  const languages = ['vi', 'ja'];
  const [selectedLanguage, setSelectedLanguage] = useState('vi');

  const categories = ['tips', 'travel'];
  const handleSelectCategory: React.ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const newInformation = {
      ...newArticle,
      category: event.target.value,
    };
    onNewArticleChange(newInformation);
  };

  const handleSelectLanguage: React.ChangeEventHandler<HTMLSelectElement> = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
    onLanguageChange(event.target.value);
  };

  return (
    <div className="sticky border top-4 rounded-lg p-4">
      <div className="mb-4">
        <Dropdown
          options={languages}
          selectedValue={selectedLanguage}
          handleSelect={handleSelectLanguage}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="url"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          URL
        </label>
        <input
          type="text"
          value={newArticle.url}
          onChange={(e) => handleMainInformationChange(e, 'url')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Category
        </label>
        <Dropdown
          options={categories}
          selectedValue={newArticle.category}
          handleSelect={handleSelectCategory}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="tags"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tags (comma separate)
        </label>
        <input
          type="text"
          value={newArticle.tags}
          onChange={(e) => handleMainInformationChange(e, 'tags')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="tips, sharing"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Tiêu đề
        </label>
        <input
          type="text"
          value={
            translations.find(
              (x: post_translation) => x.language_code == selectedLanguage
            )?.title
          }
          onChange={(e) => handleTranslateInformationChange(e, 'title')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder=""
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Ảnh bìa
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-4">
              <svg
                className="w-8 h-8  text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  {newArticle.image == '' ? (
                    'Click to upload'
                  ) : (
                    <Link href={newArticle.image} target="_blank">
                      Uploaded
                    </Link>
                  )}
                </span>
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleUploadFile}
              ref={fileInputRef}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="discription"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Mô tả
        </label>
        <textarea
          value={
            translations.find(
              (x: post_translation) => x.language_code === selectedLanguage
            )?.brief
          }
          onChange={(e) => handleTranslateInformationChange(e, 'brief')}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Mô tả"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="table-of-content"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Mục lục
        </label>
        <textarea
          value={
            translations.find(
              (x: post_translation) => x.language_code === selectedLanguage
            )?.tableOfContents
          }
          onChange={(e) =>
            handleTranslateInformationChange(e, 'tableOfContents')
          }
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Mục lục"
        ></textarea>
      </div>

      <button
        type="button"
        onClick={autoCreateTableOfContent}
        className="w-full py-2.5 px-5 mr-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Tạo mục lục tự động
      </button>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={!!newArticle.active}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Hiển thị bài viết
        </label>
      </div>

      <button
        type="button"
        onClick={createArticle}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {isUpdateMode ? 'Cập nhật bài viết' : 'Đăng  bài'}
      </button>

      <button
        type="button"
        onClick={() => (window.location.href = '/')}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Trang chủ
      </button>

      <button
        type="button"
        onClick={() => signOut()}
        className="w-full mb-2 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Đăng xuất
      </button>
    </div>
  );
}
