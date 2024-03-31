import Image from 'next/image';
import dynamic from 'next/dynamic';
import { prisma } from '@/utils/db';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
import EasyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import { useSession } from 'next-auth/react';
import { uploadImage } from '@/utils/upload';
import PostCreationBar from '@/components/Common/PostCreationBar';
import { post_translation } from '@prisma/client';

interface Props {
  params: any;
}

interface MarkdownUpdateProps {
  post: any;
}

export const getStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      url: true,
    },
    where: {
      active: true,
    },
  });

  const paths = posts.map((post) => ({ params: { slug: post.url } }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: Props) => {
  const post = await prisma.post.findFirst({
    where: {
      url: params.slug,
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

export default function UpdateArticle({ post }: MarkdownUpdateProps) {
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

  // Helper function to find translations by language
  const findTranslation = (
    postTranslations: post_translation[],
    languageCode: string
  ) => postTranslations.find((x) => x.language_code === languageCode);

  let postCreation = {
    slug: post.url,
    category: post.category,
    tags: post.tags,
    imageUrl: post.image,
    active: post.active,
    viTitle: findTranslation(post.post_translation, 'vi')?.title ?? '',
    viBrief: findTranslation(post.post_translation, 'vi')?.brief ?? '',
    viTableOfContents:
      findTranslation(post.post_translation, 'vi')?.tableOfContents ?? '',
    viContent: findTranslation(post.post_translation, 'vi')?.markdown ?? '',
    jaTitle: findTranslation(post.post_translation, 'ja')?.title ?? '',
    jaBrief: findTranslation(post.post_translation, 'ja')?.brief ?? '',
    jaTableOfContents:
      findTranslation(post.post_translation, 'ja')?.tableOfContents ?? '',
    jaContent: findTranslation(post.post_translation, 'ja')?.markdown ?? '',
  };

  // language
  const [language, setLanguage] = useState('Vietnamese');
  const handleLanguageChange = (language: any) => {
    setLanguage(language);
  };

  // header image
  const [imageUrl, setImageUrl] = useState(postCreation.imageUrl);
  // title
  const [title, setTitle] = useState(postCreation.viTitle);

  // content
  const [viContent, setViContent] = useState(postCreation.viContent);
  const [jaContent, setJaContent] = useState(postCreation.jaContent);

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
        onError('Upload image error, maybe size of image too big');
      }
    }
  };

  const editorOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      lineNumbers: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="container mx-auto w-full md:max-w-8xl mt-4">
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
            options={editorOptions}
          />
        </div>
        <div className="w-1/4">
          <PostCreationBar
            initPostCreation={postCreation}
            language={language}
            updateMode={true}
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
