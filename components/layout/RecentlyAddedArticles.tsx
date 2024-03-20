import { post } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import ArticleCard from '../Card/ArticleCard';

export default function RecentlyAddedArticles() {
  const [relatedPosts, setRelatedPosts] = useState<post[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNewestPosts = async () => {
      const response = await fetch('/api/articles/recently/added');
      const data = await response.json();
      setRelatedPosts(data);
    };
    fetchNewestPosts();
  }, []);

  return (
    <div className="w-full mt-8">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-gray-900">
          {t('common:recentlyPosted')}
        </h2>
        <hr className="mb-4" />

        {relatedPosts && (
          <div className="w-full ">
            {relatedPosts.map((post) => (
              <ArticleCard key={post.url} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
