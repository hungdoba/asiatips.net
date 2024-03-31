// replace the image format
export default function parseMarkdown(content: string) {
  const regex = /!\[(.*?)\]\((.*?)\)/g;
  return content.replace(
    regex,
    (match, alt, url) =>
      `<Image height={1280} width={1920} sizes="(min-width: 1360px) 920px, (min-width: 780px) 66.96vw, (min-width: 680px) 608px, calc(94.44vw - 15px)" src="${url}" alt="${alt}"/>`
  );
}
