import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import { uploadImage } from '@/utils/upload';
import PostCreationBar from '@/components/Common/PostCreationBar';

export default function CreateArticle() {
  // check login before allow modify
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  // prevent close
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e: any) => {
    const confirmationMessage =
      'Are you sure you want to leave this page? Your changes may not be saved.';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  // language
  const [language, setLanguage] = useState('Vietnamese');
  const handleLanguageChange = (language: any) => {
    setLanguage(language);
  };

  // header image
  const [imageUrl, setImageUrl] = useState('');
  // title
  const [title, setTitle] = useState('');

  // content
  const [viContent, setViContent] = useState('');
  const [jaContent, setJaContent] = useState('');

  // handle change content
  const handleContentChanged = (value: string) => {
    language === 'Vietnamese' ? setViContent(value) : setJaContent(value);
  };

  const handleImageUpload = async (
    file: File,
    onSuccess: any,
    onError: any
  ) => {
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          onSuccess(imageUrl);
        } else {
          alert('Upload image fail');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        onError(error);
      }
    }
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      lineNumbers: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="container mx-auto w-full md:max-w-7xl mt-4">
      <div className="flex flex-row mx-8">
        <div className="w-3/4 prose-lg pr-4">
          {imageUrl && (
            <Image
              className="w-full rounded-xl"
              height={1000}
              width={800}
              src={imageUrl}
              alt="Article Image"
            />
          )}
          <h1 className="text-4xl font-bold my-4">{title}</h1>
          <SimpleMdeReact
            value={language === 'Vietnamese' ? viContent : jaContent}
            onChange={handleContentChanged}
            options={options}
          />
        </div>
        <div className="w-1/4">
          <PostCreationBar
            language={language}
            updateMode={false}
            onLanguageChange={handleLanguageChange}
            onImageChange={(imageUrl: string) => setImageUrl(imageUrl)}
            onTitleChange={(title: string) => setTitle(title)}
            viContent={viContent}
            jaContent={jaContent}
          />
        </div>
      </div>
    </div>
  );
}
