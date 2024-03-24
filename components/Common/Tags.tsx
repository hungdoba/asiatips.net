import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toTitleCase } from '@/utils/helpers';

interface TagsProps {
  initTags?: string[];
  highlightedTag?: string;
  category?: string;
  clickable?: boolean;
}

export default function Tags({
  initTags = [],
  highlightedTag,
  category,
  clickable = false,
}: TagsProps) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(initTags);

  // fetch tags in case doen't has one
  useEffect(() => {
    if (tags.length == 0) {
      let url = category ? `/api/tags/${category}` : '/api/tags';
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setTags(data);
      };
      fetchData();
    }
  }, [category, initTags, tags]);

  // click on tag
  const redirectToTag = (tag: any) => {
    router.push(`/tags/${tag}`);
  };

  return (
    <div className="flex flex-wrap">
      {category && (
        <div className="flex">
          <span
            className={`bg-orange-200 text-orange-800 border-orange-200 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded border  hover:cursor-pointer`}
          >
            {toTitleCase(category)}
          </span>
          <p>&#9755;&nbsp;</p>
        </div>
      )}
      {tags.map((tag, id) => (
        <span
          key={id}
          onClick={() => clickable && redirectToTag(tag)}
          className={`${
            highlightedTag == tag
              ? 'bg-orange-100 text-orange-800 border-orange-400'
              : `bg-blue-100 ${
                  clickable
                    ? 'text-blue-800 border-blue-400'
                    : 'text-blue-500 border-blue-100'
                }`
          }  text-xs mr-2 mb-2 px-2.5 py-0.5 rounded border  hover:cursor-pointer`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
