import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Tags({ initTags, highline, category, isClickable }) {
  const [tags, setTags] = useState<string[]>(initTags);
  const router = useRouter();

  useEffect(() => {
    if (category == null && initTags == null) {
      const fetchData = async () => {
        const response = await fetch('/api/post/tag');
        const data = await response.json();
        setTags(data);
      };
      fetchData();
    } else if (category != null) {
      const fetchData = async () => {
        const response = await fetch(`/api/post/tag/${category}`);
        const data = await response.json();
        setTags(data);
      };
      fetchData();
    }
  }, [category, initTags]);

  const redirectToTag = (tag: any) => {
    router.push(`/tags/${tag}`);
  };

  function formatText(inputText: string) {
    const words = inputText.split('-');
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const formattedText = formattedWords.join(' ');
    return formattedText;
  }

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
      {tags &&
        tags.map((tag: any, id) =>
          isClickable ? (
            <span
              key={id}
              onClick={() => redirectToTag(tag)}
              className={`${
                highline == tag
                  ? 'bg-orange-100 text-orange-800 border-orange-400'
                  : 'bg-blue-100 text-blue-800 border-blue-400'
              }  text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded border  hover:cursor-pointer`}
            >
              {tag}
            </span>
          ) : (
            <span
              key={id}
              className="bg-blue-50 text-blue-400 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded border border-blue-50"
            >
              {tag}
            </span>
          )
        )}
    </div>
  );
}
