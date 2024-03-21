import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NewArticle } from '@/utils/types';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import ControlBar from '@/components/Common/ControlBar';
import { post, post_translation } from '@prisma/client';

export default function MarkdownCreate() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const router = useRouter();
  const [language, setLanguage] = useState('vi');
  const [newArticle, setNewArticle] = useState<post>({
    id: 0,
    url: '',
    category: 'tips',
    image: '',
    tags: ['tips'],
    active: true,
    created_at: new Date(),
  });
  const [translations, setTranslations] = useState<post_translation[]>([
    {
      id: 0,
      post_id: 0,
      language_code: 'vi',
      title: '',
      brief: '',
      tableOfContents: '',
      markdown: '',
    },
  ]);

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

  const handleContentChanged = (value: string) => {
    // find content index
    const index = translations?.findIndex(
      (x: post_translation) => x.language_code == language
    );

    // found
    if (index != -1) {
      const updatedTranslations = [...translations];
      updatedTranslations[index] = {
        ...updatedTranslations[index],
        markdown: value,
      };
      setTranslations(updatedTranslations);
    } else {
      console.error("Translation with language_code 'vi' not found");
    }
  };

  const handleImageUpload = async (
    file: File,
    onSuccess: any,
    onError: any
  ) => {
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
        onSuccess(data.imageURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        onError(error);
      }
    };
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

  const handleNewArticleChange = (newInformation: any) => {
    setNewArticle(newInformation);
  };

  const handleTranslationChaned = (newInformation: any) => {
    setTranslations(newInformation);
  };

  return (
    <div className="container mx-auto w-full md:max-w-7xl mt-4">
      <div className="flex flex-row mx-8">
        <div className="w-3/4 prose-lg pr-4">
          {newArticle.image && (
            <Image
              className="w-full rounded-xl"
              height={1000}
              width={800}
              src={newArticle.image}
              alt="Article Image"
            />
          )}
          <h1 className="text-4xl font-bold my-4">
            {
              translations.find(
                (x: post_translation) => x.language_code === language
              )?.title
            }
          </h1>
          <SimpleMdeReact
            value={
              translations.find(
                (x: post_translation) => x.language_code === language
              )?.markdown
            }
            onChange={handleContentChanged}
            options={options}
          />
        </div>
        <div className="w-1/4">
          <ControlBar
            newArticle={newArticle}
            translations={translations}
            onNewArticleChange={handleNewArticleChange}
            onTranslationChanged={handleTranslationChaned}
            isUpdateMode={true}
            onLanguageChange={(language: string) => {
              setLanguage(language);
            }}
          />
        </div>
      </div>
    </div>
  );
}
