export const renderWithUnderline = (text: string | null) => {
  if (text == null) {
    return '';
  }

  const parts = text.split(/(\[.*?\])/);

  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return <u key={index}>{part.slice(1, -1)}</u>;
    }
    return part;
  });
};

export function convertToFullWidthStar(text: string | null) {
  if (text == null) {
    return '';
  }

  return text.replace('_*_', '＿★＿');
}

export function convertToFullWidthParentheses(text: string | null) {
  if (text == null) {
    return '';
  }
  return text.replace(/\((.*?)\)/g, '（　$1　）');
}
