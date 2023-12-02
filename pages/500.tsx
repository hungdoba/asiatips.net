import SEO from '@/components/layout/SEO';
import Navbar from '@/components/layout/Navbar';

export default function About() {
  return (
    <>
      <SEO
        title="Server Error - 500 | Asiatips HYIP Monitor"
        description="Oops, something went wrong on our server. We are working to fix the issue and apologize for the inconvenience. Please try again later or contact us for assistance."
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/500"
      />
      <Navbar />
      <section className="bg-white mt-60">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
              500
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
              Internal Server Error
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
