import Image from 'next/image';
import dynamic from 'next/dynamic';
import { prisma } from '@/utils/db';
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

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
    },
    where: {
      active: true,
    },
  });

  const paths = posts.map((post) => ({ params: { url: post.url } }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      url: params.url,
    },
    include: {
      post_translation: true,
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default function MarkdownUpdate({ post }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  const router = useRouter();
  const [language, setLanguage] = useState('vi');
  const [newArticle, setNewArticle] = useState(() => {
    const defaultTranslation = {
      title: '',
      brief: '',
      tableOfContents: '',
      markdown: '',
    };

    if (!post || !post.post_translation || post.post_translation.length !== 2) {
      // If the post or its translations are not available or incomplete
      return {
        url: '',
        category: '',
        imageUrl: '',
        tags: [],
        active: false,
        translate: {
          vi: { ...defaultTranslation },
          ja: { ...defaultTranslation },
        },
      };
    }

    // Extracting translations from the post object
    const viTranslation = post.post_translation.find(
      (translation) => translation.language_code === 'vi'
    );
    const jaTranslation = post.post_translation.find(
      (translation) => translation.language_code === 'ja'
    );

    return {
      url: post.url || '',
      category: post.category || '',
      imageUrl: post.image || '',
      tags: post.tags || [],
      active: post.active || false,
      translate: {
        vi: {
          title: viTranslation?.title || '',
          brief: viTranslation?.brief || '',
          tableOfContents: viTranslation?.tableOfContents || '',
          markdown: viTranslation?.markdown || '',
        },
        ja: {
          title: jaTranslation?.title || '',
          brief: jaTranslation?.brief || '',
          tableOfContents: jaTranslation?.tableOfContents || '',
          markdown: jaTranslation?.markdown || '',
        },
      },
    };
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
    setNewArticle(newArticle);
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
