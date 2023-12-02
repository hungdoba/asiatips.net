import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Carousel from '../../../components/common/Carousel';
import getResults from '../../../utils/cachedImages';
import cloudinary from '../../../utils/cloudinary';
import getBase64ImageUrl from '../../../utils/generateBlurPlaceholder';
import type { ImageProps } from '../../../utils/types';
import SEO from '@/components/layout/SEO';

export async function getStaticPaths() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute();

  const fullPaths = results.resources.map((resource, index) => ({
    params: { photoId: index.toString() },
  }));

  return {
    paths: fullPaths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const results = await getResults();

  let reducedResults: ImageProps[] = [];
  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(context.params?.photoId)
  );
  if (currentPhoto) {
    currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto); // Assuming getBase64ImageUrl returns a promise
  }

  if (!currentPhoto) {
    // Handle the case where currentPhoto is undefined
    return {
      notFound: true, // Or any other error handling logic
    };
  }

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
};

function Photo({ currentPhoto }) {
  const router = useRouter();
  const { photoId } = router.query;
  let index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <SEO
        title="Asiatips | Ảnh chill Nhật Việt"
        description="Blog chia sẻ kiến thức và mẹo hay khi sống ở Nhật dành cho người nước ngoài"
        image="https://www.asiatips.net/card.jpg"
        url="https://asiatips.net/knowledge"
      />
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
}

export default Photo;
