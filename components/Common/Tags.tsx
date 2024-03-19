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
      try {
        let response;
        if (category == null && initTags.length === 0) {
          response = await fetch('/api/post/tag');
        } else {
          response = await fetch(`/api/post/tag/${category}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
        // alert('Error fetching tags');
      }
    };

    fetchData();
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
          <span className="tag-label">{formatText(category)}</span>
          <p>&#9755;&nbsp;</p>
        </div>
      )}
      {tags.map((tag, id) => (
        <span
          key={id}
          onClick={() => isClickable && redirectToTag(tag)}
          className={`tag ${
            highlightedTag === tag
              ? 'bg-orange-100 text-orange-800 border-orange-400'
              : 'bg-blue-100 text-blue-800 border-blue-400'
          } ${isClickable ? 'cursor-pointer' : ''}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
