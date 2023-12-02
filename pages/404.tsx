import SEO from '@/components/layout/SEO';
import Navbar from '@/components/layout/Navbar';

export default function About() {
  return (
    <>
      <SEO
        title="Oops! Page Not Found | Asiatips HYIP Monitor"
        description="We're sorry, the page you're looking for doesn't seem to exist. Please check the URL and try again, or use our navigation menu to find what you're looking for. If you're still having trouble, feel free to contact us for further assistance. Thank you for using Asiatips HYIP Monitor!"
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/404"
      />
      <Navbar />
      <section className="bg-white mt-60">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 ">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.
            </p>
            <a
              href="#"
              className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
