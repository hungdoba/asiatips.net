import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Tags from '../Common/Tags';
import { convert } from '@/utils/slugify';

const ArticleCard: React.FC<{ post: any }> = ({ post }) => {
  const router = useRouter();

  const viTranslation = post.post_translation.find(
    (translation: any) => translation.language_code === 'vi'
  );
  const jaTranslation = post.post_translation.find(
    (translation: any) => translation.language_code === 'ja'
  );

  return (
    <Link
      className="w-full"
      href={`/${convert(post.category)}/${post.url}`}
      key={post.url}
    >
      <div className="flex items-stretch w-full mb-2 p-2 md:p-6 bg-white rounded-lg hover:shadow border border-gray-200">
        <div className="w-1/3 max-h-fit">
          <Image
            src={post.image}
            alt="Post Image"
            className="w-full h-full rounded-lg object-cover object-center"
            height={1280}
            width={1920}
            sizes="(min-width: 1360px) 297px, (min-width: 780px) 22.32vw, (min-width: 680px) 202px, calc(31.39vw - 5px)"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex flex-col justify-around w-2/3 pl-6">
          <h1 className="mb-2 md:text-xl md:font-bold text-gray-900">
            {router.locale === 'vi' ? viTranslation.title : jaTranslation.title}
          </h1>
          <p className="hidden md:block font-normal text-gray-700 mb-2">
            {router.locale === 'vi' ? viTranslation.brief : jaTranslation.brief}
          </p>
          <p className="font-semibold text-gray-500 text-sm mb-2">
            {new Date(post.created_at).toLocaleDateString(router.locale, {
              timeZone: 'Asia/Ho_Chi_Minh',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <Tags initTags={post.tags} />
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
