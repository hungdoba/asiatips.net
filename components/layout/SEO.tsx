import Head from 'next/head';

function SEO({ title, description, image, url }) {
  const siteTitle = ' Asiatips | Mẹo hay khi sống tại Nhật';
  const siteDescription =
    'Chia sẻ mẹo hay cho người Việt khi sống tại Nhật Bản';

  const metaDescription = description || siteDescription;
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaUrl = url || 'https://www.asiatips.net';
  const metaImage = image || 'https://www.asiatips.net/card.jpg';

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@asiatips_net" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <link rel="canonical" href={metaUrl} />
      <link rel="icon" type="image/ico" href="/favicon.ico" />
    </Head>
  );
}

export default SEO;
