export const toTitleCase = (inputText: string) => {
  return inputText
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
