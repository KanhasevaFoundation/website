import { Helmet } from 'react-helmet-async';

const OurPrograms = () => {
  return (
    <div className="p-8 bg-sky-50">
      <Helmet>
        <title>Services – Kanhaseva</title>
        <meta name="description" content="Cow feeding, food sharing, and essentials support – simple seva efforts." />
        <link rel="canonical" href="https://kanhasevain.vercel.app/services" />
        <meta property="og:title" content="Services – Kanhaseva" />
        <meta property="og:description" content="Overview of personal seva activities." />
        <meta property="og:url" content="https://kanhasevain.vercel.app/services" />
        <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-900">Services</h1>

      {/* Cow Feeding Program */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">1. Cow Feeding (Personal Seva)</h2>
        <p className="text-sky-700">
          I personally arrange and provide nutritious food and care to cows as part of my voluntary effort.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Local help: I coordinate with individuals to identify cows needing support.</li>
          <li>Food arrangements: I source and deliver fodder and supplements.</li>
          <li>Care: I prioritize basic care through personal effort.</li>
          <li>Awareness: I share information on cow welfare within my circles.</li>
        </ul>
        <h4 className="font-semibold text-sky-800">Benefits:</h4>
        <ul className="list-disc ml-6 text-sky-700">
          <li>Supports cow welfare through personal seva.</li>
          <li>Encourages community participation informally.</li>
          <li>Focuses on simple, practical help.</li>
        </ul>
      </section>

      {/* Meal Distribution Program */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">2. Meal Distribution (Personal Seva)</h2>
        <p className="text-sky-700">
          I prepare or arrange simple, nutritious meals and share them with individuals in need, informally and personally.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">Key Features:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Personal deliveries where possible.</li>
          <li>Small local sharing based on availability.</li>
          <li>Encouraging simple healthy eating.</li>
        </ul>
      </section>

      {/* Donation Drives */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">3. Essentials Sharing</h2>
        <p className="text-sky-700">
          I occasionally collect and share essential items like clothing or basic supplies with people who need them.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">How You Can Help:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Share directly where you see need.</li>
          <li>Offer simple help in your locality.</li>
          <li>Spread awareness informally.</li>
        </ul>
      </section>

      {/* Community Workshops */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">4. Community Guidance</h2>
        <p className="text-sky-700">
          I share practical guidance and resources informally to help individuals with everyday challenges.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">Workshop Highlights:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Simple tips and resources.</li>
          <li>Encouraging supportive connections.</li>
          <li>Occasional sharing from experienced individuals.</li>
        </ul>
      </section>

      {/* Get Involved */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">Get Involved</h2>
        <p className="text-sky-700">
          If you wish to support this personal seva, you can volunteer, share essentials, or contribute in simple ways.
        </p>
      </section>

      {/* Contact Us */}
      <section className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">Contact Us</h2>
        <p className="text-sky-700">
          For more information about these personal services or to get involved, reach out at
          <a href="mailto:contact@kanhaseva.in" className="text-sky-600 hover:underline"> contact@kanhaseva.in</a>.
        </p>
      </section>
    </div>
  );
};

export default OurPrograms;
