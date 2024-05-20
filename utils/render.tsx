export const renderJLPTContent = (text: string | null) => {
  if (text == null) {
    return '';
  }

  // Convert star
  text = text.replace('_*_', '＿★＿');

  // Convert parenthese
  text = text.replace(/\((.*?)\)/g, '（　$1　）');

  // Convert [] to underline
  const parts = text.split(/(\[.*?\])/);

  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return <u key={index}>{part.slice(1, -1)}</u>;
    }
    return part;
  });
};
