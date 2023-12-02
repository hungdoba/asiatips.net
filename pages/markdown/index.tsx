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
import MarkdownControl from '@/components/overview/MarkdownControl';
import { NewArticle } from '@/utils/types';

export default function MarkdownCreate() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const router = useRouter();
  const [language, setLanguage] = useState('vi');
  const [newArticle, setNewArticle] = useState<NewArticle>({
    url: '',
    category: 'tips',
    imageUrl: '',
    tags: '',
    active: 'true',
    translate: {
      vi: {
        title: '',
        brief: '',
        tableOfContents: '',
        markdown: '',
      },
      ja: {
        title: '',
        brief: '',
        tableOfContents: '',
        markdown: '',
      },
    },
  });

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (e) => {
    const confirmationMessage =
      'Are you sure you want to leave this page? Your changes may not be saved.';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };

  const handleMarkdownChange = (value: string) => {
    let newInformation = {
      ...newArticle,
      translate: {
        ...newArticle.translate,
        [language]: {
          ...newArticle.translate[language],
          markdown: value,
        },
      },
    };
    setNewArticle(newInformation);
  };

  const handleImageUpload = async (file: any, onSuccess: any, onError: any) => {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload-aws?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      const finalImageUrl = `${url}/${fields.key}`;
      console.log('Uploaded successfully! ', finalImageUrl);
      onSuccess(finalImageUrl);
    } else {
      console.error('Upload failed.');
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

  const handleNewArticleChange = (newInformation: NewArticle) => {
    setNewArticle(newInformation);
  };

  return (
    <div className="container mx-auto w-full md:max-w-7xl mt-4">
      <div className="flex flex-row mx-8">
        <div className="w-3/4 prose-lg pr-4">
          {newArticle.imageUrl && (
            <Image
              className="w-full rounded-xl"
              height={1000}
              width={800}
              src={newArticle.imageUrl}
              alt="Article Image"
            />
          )}
          <h1 className="text-4xl font-bold my-4">
            {newArticle.translate[language].title}
          </h1>
          <SimpleMdeReact
            value={newArticle.translate[language].markdown}
            onChange={handleMarkdownChange}
            options={options}
          />
        </div>
        <div className="w-1/4">
          <MarkdownControl
            newArticle={newArticle}
            onNewArticleChange={handleNewArticleChange}
            isUpdateMode={false}
            onLanguageChange={(language: string) => {
              setLanguage(language);
            }}
          />
        </div>
      </div>
    </div>
  );
}
