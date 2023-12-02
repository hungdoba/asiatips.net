import Link from 'next/link';
import Image from 'next/image';
import Tags from '../common/Tags';
import { post } from '@prisma/client';

const NewestCard: React.FC<{ post: post }> = ({ post }) => {
  return (
    <Link
      className="flex w-full h-48 my-4 border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50"
      href={`/${post.url}`}
      key={post.url}
    >
      <div className="w-1/3 max-h-fit">
        <Image
          src={post.image}
          alt="Post Image"
          className="w-full object-cover object-center"
          width={300}
          height={200}
        />
      </div>

      <div className="flex flex-col justify-around w-2/3 px-4">
        <h5 className="md:text-xl md:font-bold text-gray-900">{post.title}</h5>
        <p className="hidden md:block font-normal text-gray-700">
          {post.brief}
        </p>
        <div className="flex justify-between items-center ">
          <p className="font-semibold text-gray-500 text-sm">
            {new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <Tags
            highline={null}
            category={null}
            initTags={null}
            isClickable={false}
          />
        </div>
      </div>
    </Link>
  );
};

export default NewestCard;
