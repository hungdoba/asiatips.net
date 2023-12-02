import { useEffect, useState } from 'react';
import { post } from '@prisma/client';
import PostCard from '@/components/overview/PostCard';

export default function Newest() {
  const [relatedPosts, setRelatedPosts] = useState<post[]>([]);

  useEffect(() => {
    const fetchNewestPosts = async () => {
      const response = await fetch('/api/post/newest');
      const data = await response.json();
      setRelatedPosts(data);
    };
    fetchNewestPosts();
  }, []);
  return (
    <div className="w-full mt-8">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          Bài viết mới nhất
        </h2>
        <hr className="mb-4" />

        {relatedPosts && (
          <div className="w-full ">
            {relatedPosts.map((post) => (
              <PostCard key={post.url} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
