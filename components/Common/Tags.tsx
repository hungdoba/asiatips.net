import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface TagsProps {
  initTags?: string[];
  highlightedTag?: string;
  category?: string;
  isClickable?: boolean;
}

export default function Tags({
  initTags = [],
  highlightedTag,
  category,
  isClickable = true,
}: TagsProps) {
  const [tags, setTags] = useState<string[]>(initTags);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let url = '/api/tags';
      if (category !== null) {
        url = `/api/tags/${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setTags(data);
    };

    if (category === null && initTags === null) {
      fetchData();
    }
  }, [category, initTags]);

  const redirectToTag = (tag: any) => {
    router.push(`/tags/${tag}`);
  };

  const formatText = (inputText: string) => {
    return inputText
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex flex-wrap">
      {category && (
        <div className="flex">
          <span
            className={`bg-orange-200 text-orange-800 border-orange-200 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded border  hover:cursor-pointer`}
          >
            {formatText(category)}
          </span>
          <p>&#9755;&nbsp;</p>
        </div>
      )}
      {tags.map((tag, id) => (
        <span
          key={id}
          onClick={() => isClickable && redirectToTag(tag)}
          className={`${
            highlightedTag == tag
              ? 'bg-orange-100 text-orange-800 border-orange-400'
              : 'bg-blue-100 text-blue-800 border-blue-400'
          }  text-xs mr-2 mb-2 px-2.5 py-0.5 rounded border  hover:cursor-pointer`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
