import React from 'react';

interface UnderlineProps {
  content: string;
  color: string;
}

export default function Underline({ content, color }: UnderlineProps) {
  return (
    <span
      className={`inline-block underline decoration-${color}-300 decoration-2`}
    >
      {content}
    </span>
  );
}
