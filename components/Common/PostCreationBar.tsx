import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { PostCreation } from '@/utils/types';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Combobox from '../Control/Combobox';
import { convert } from '@/utils/slugify';
import { uploadImage } from '@/utils/upload';

interface PostCreationBarProps {
  initPostCreation?: PostCreation;
  updateMode: boolean;
  language: string;
  onLanguageChange: any;
  onImageChange: any;
  onTitleChange: any;
  viContent: string;
  jaContent: string;
}

function PostCreationBar({
  initPostCreation,
  updateMode = false,
  language,
  onLanguageChange,
  onImageChange,
  onTitleChange,
  viContent,
  jaContent,
}: PostCreationBarProps) {
  // categories
  const categories = ['tips', 'travel'];

  // post creation
  const [postCreation, setPostCreation] = useState<PostCreation>({
    slug: initPostCreation?.slug ?? '',
    category: initPostCreation?.category ?? categories[0],
    tags: initPostCreation?.tags ?? '',
    imageUrl: initPostCreation?.imageUrl ?? '',
    active: initPostCreation?.active ?? true,
    viTitle: initPostCreation?.viTitle ?? '',
    viBrief: initPostCreation?.viBrief ?? '',
    viTableOfContents: initPostCreation?.viTableOfContents ?? '',
    viContent: viContent,
    jaTitle: initPostCreation?.jaTitle ?? '',
    jaBrief: initPostCreation?.jaBrief ?? '',
    jaTableOfContents: initPostCreation?.jaTableOfContents ?? '',
    jaContent: jaContent,
  });

  // language changed
  useEffect(() => {
    language === 'Vietnamese'
      ? (setTitle(postCreation.viTitle),
        setBrief(postCreation.viBrief),
        setTableOfContens(postCreation.viTableOfContents))
      : (setTitle(postCreation.jaTitle),
        setBrief(postCreation.jaBrief),
        setTableOfContens(postCreation.jaTableOfContents));
  }, [language, postCreation]);

  // content changed
  useEffect(() => {
    changePostCreation('viContent', viContent);
  }, [viContent]);

  useEffect(() => {
    changePostCreation('jaContent', jaContent);
  }, [jaContent]);

  // variable for post
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [tableOfContents, setTableOfContens] = useState('');

  // update post creation
  const changePostCreation = (field: string, value: string) => {
    if (field === 'slug') {
      value = value.replace(' ', '-');
    }
    let newValue = {
      ...postCreation,
      [field]: value,
    };
    setPostCreation(newValue);
  };

  // update language fields to sumary post creation
  useEffect(() => {
    language === 'Vietnamese'
      ? changePostCreation('viTitle', title)
      : changePostCreation('jaTitle', title);
    onTitleChange(title);
  }, [title]);
  useEffect(() => {
    language === 'Vietnamese'
      ? changePostCreation('viBrief', brief)
      : changePostCreation('jaBrief', brief);
  }, [brief]);
  useEffect(() => {
    language === 'Vietnamese'
      ? changePostCreation('viTableOfContents', tableOfContents)
      : changePostCreation('jaTableOfContents', tableOfContents);
  }, [tableOfContents]);

  // handle image upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file);
          if (imageUrl) {
            changePostCreation('imageUrl', imageUrl);
            onImageChange(imageUrl);
          } else {
            alert('Upload image fail');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Upload image fail');
        }
      }
    }
  };

  // create table of content
  const createTableOfContent = () => {
    let content = postCreation.jaContent;
    if (language === 'Vietnamese') {
      content = postCreation.viContent;
    }
    let headings = content.match(/^(#+)(.*)/gm);
    if (!headings || headings.length === 0) {
      console.log('No headings found.');
      return;
    }

    let toc = '';
    headings.forEach((heading: string) => {
      const matchResult = heading.match(/^#+/);
      if (matchResult) {
        const level = matchResult[0].length;
        const text = heading.replace(/^#+\s*/, '');
        const slug = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace('.', '')
          .replace(':', '');
        toc += `${'  '.repeat(level - 1)}- [${text}](#${slug})\n`;
      }
    });
    setTableOfContens(toc);
  };

  const validateArticle = () => {
    if (postCreation.imageUrl == '') {
      alert('No image');
      return false;
    }
    if (postCreation.slug == '') {
      alert('No slug');
      return false;
    }
    if (postCreation.tags == '') {
      alert('No tags');
      return false;
    }

    if (postCreation.viTitle == '') {
      alert('No Vietnamese title');
      return false;
    }
    if (postCreation.viBrief == '') {
      alert('No Vietnamese brief');
      return false;
    }
    if (postCreation.viTableOfContents == '') {
      alert('No Vietnamese table of contents');
      return false;
    }
    if (postCreation.viContent == '') {
      alert('No Vietnamese content');
      return false;
    }
    if (postCreation.jaTitle == '') {
      alert('No Japanese title');
      return false;
    }
    if (postCreation.jaBrief == '') {
      alert('No Japanese brief');
      return false;
    }
    if (postCreation.jaTableOfContents == '') {
      alert('No Japanese table of contents');
      return false;
    }
    if (postCreation.jaContent == '') {
      alert('No Japanese content');
      return false;
    }

    return true;
  };

  // create article
  const createArticle = async () => {
    if (!validateArticle()) return;

    const formData = new FormData();
    formData.append('url', postCreation.slug);
    formData.append('category', postCreation.category);
    formData.append('tags', postCreation.tags);
    formData.append('image', postCreation.imageUrl);
    formData.append('active', String(postCreation.active));

    formData.append('viTitle', String(postCreation.viTitle));
    formData.append('viBrief', String(postCreation.viBrief));
    formData.append(
      'viTableOfContents',
      String(postCreation.viTableOfContents)
    );
    formData.append('viMarkdown', String(postCreation.viContent));

    formData.append('jaTitle', String(postCreation.jaTitle));
    formData.append('jaBrief', String(postCreation.jaBrief));
    formData.append(
      'jaTableOfContents',
      String(postCreation.jaTableOfContents)
    );
    formData.append('jaMarkdown', String(postCreation.jaContent));

    let method = updateMode ? 'PUT' : 'POST';
    const response = await fetch('/api/article/create', {
      method: method,
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) {
      alert(`Error: ${result.message}`);
      return;
    }
    if (updateMode) {
      alert('Updated');
      return;
    } else {
      window.open(
        `${convert(postCreation.category)}/${postCreation.slug}`,
        '_blank'
      );
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mt-4">
      <input
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={postCreation.slug}
        onChange={(event: any) =>
          changePostCreation('slug', event.target.value)
        }
        placeholder="Slug"
      ></input>
      <label
        htmlFor="dropzone-file"
        className="mb-4 flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
              {postCreation.imageUrl == '' ? (
                'Click to upload'
              ) : (
                <Link
                  className="text-blue-500"
                  href={postCreation.imageUrl ?? ''}
                  target="_blank"
                >
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
          onChange={handleUploadImage}
          ref={fileInputRef}
        />
      </label>
      <div className="flex items-center align-middle mb-4">
        <label
          htmlFor="default-checkbox"
          className="mr-4 text-sm font-medium text-gray-900"
        >
          Category
        </label>
        <Combobox
          options={categories}
          value={postCreation.category}
          onChange={(value: any) => changePostCreation('category', value)}
        />
      </div>
      <input
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Tags"
        value={postCreation.tags}
        onChange={(event: any) =>
          changePostCreation('tags', event.target.value)
        }
      ></input>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          onChange={(event: any) =>
            changePostCreation('active', event.target.checked)
          }
          checked={postCreation.active}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="default-checkbox"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Hiển thị bài viết
        </label>
      </div>
      <Combobox
        options={['Vietnamese', 'Japanese']}
        value={language}
        onChange={onLanguageChange}
        className="mb-4"
      />
      <input
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Title"
        value={title}
        onChange={(event: any) => setTitle(event.target.value)}
      ></input>
      <textarea
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Brief"
        value={brief}
        onChange={(event: any) => setBrief(event.target.value)}
      ></textarea>
      <textarea
        className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Table of content"
        value={tableOfContents}
        onChange={(event: any) => setTableOfContens(event.target.value)}
      ></textarea>
      <button
        type="button"
        onClick={createTableOfContent}
        className="w-full py-2.5 px-5 mr-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      >
        Create Table Of Content
      </button>
      <button
        type="button"
        onClick={createArticle}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        {updateMode ? 'Update Article' : 'Post Article'}
      </button>

      <button
        type="button"
        onClick={() => (window.location.href = '/')}
        className="w-full mb-2 text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Home Page
      </button>

      <button
        type="button"
        onClick={() => signOut()}
        className="w-full mb-2 text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Sign Out
      </button>
    </div>
  );
}

export default PostCreationBar;
