import SEO from '@/components/layout/SEO';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - Our Commitment to Your Privacy"
        description="At Asiatips.net, we are committed to protecting your privacy. Our privacy policy outlines how we collect, use, and protect your personal information. Read our policy to learn more about our commitment to safeguarding your privacy."
        image="https://www.Asiatips.net/card.jpg"
        url="https://Asiatips.net/privacy"
      />
      <Navbar />
      <section className="bg-white pt-20 px-4 md:px-10">
        <div className="container mx-auto pt-4 pb-12">
          <h2 className="text-4xl font-extrabold">Privacy Policy</h2>
          <hr className="h-px my-8 bg-gray-200 border-0"></hr>

          <div className="px-16">
            <p className="my-4 text-lg text-gray-500">
              At [HYIP Analysis Website], we are committed to protecting the
              privacy of our users and maintaining the security of their
              personal information. This privacy policy outlines the types of
              information we collect, how we use it, and the steps we take to
              protect it.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Information Collection and Use
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              We collect information from our users in a variety of ways,
              including through registration, surveys, and other forms on our
              website. This information may include personal information such as
              your name, email address, and other contact information.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              We use this information to provide you with the services you have
              requested, to communicate with you about our services, and to
              improve the content and functionality of our website. We may also
              use your personal information to send you promotional materials or
              special offers, but only if you have agreed to receive such
              communications.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Information Sharing and Disclosure
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              We do not sell, rent, or share your personal information with
              third parties except in the following circumstances:
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              To provide you with the services you have requested. To respond to
              legal requests, enforce our policies, or comply with the law. To
              protect the rights, property, or safety of [HYIP Analysis
              Website], our users, or the public.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Data Security We take appropriate security measures to protect
              against unauthorized access, alteration, disclosure, or
              destruction of your personal information. This includes secure
              servers, firewalls, and encryption of sensitive information.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Cookies and Tracking Technology We use cookies and other tracking
              technologies to improve the performance of our website and enhance
              your user experience. Cookies are small data files that are stored
              on your computer or device and are used to remember your
              preferences and other information. You can disable cookies in your
              browser settings if you prefer not to receive them.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Changes to this Privacy Policy We may update this privacy policy
              from time to time, so please check back regularly for any changes.
              If we make any material changes to this policy, we will provide
              notice to our users through our website or by other means as
              required by law.
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              Contact Us If you have any questions or concerns about this
              privacy policy or the information we collect, please contact us at
              [insert contact information].
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500">
              This privacy policy was last updated on 02/02/2023.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
