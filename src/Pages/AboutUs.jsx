import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
<div className="bg-sky-50">
<Helmet>
  <title>About – Kanhaseva</title>
  <meta name="description" content="Personal seva initiative: feeding cows and supporting underprivileged individuals." />
  <link rel="canonical" href="https://kanhasevain.vercel.app/about" />
  <meta property="og:title" content="About – Kanhaseva" />
  <meta property="og:description" content="Learn about the Kanhaseva personal seva initiative." />
  <meta property="og:url" content="https://kanhasevain.vercel.app/about" />
  <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
<div className="py-12 px-4 max-w-4xl mx-auto bg-sky-50 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-sky-900">About KanhaSeva.in</h1>
      <p className="text-lg mb-6 text-sky-700">
        KanhaSeva.in is a personal initiative. I carry out small acts of seva to support cows and individuals in need. This is a voluntary effort driven by compassion and simplicity.
      </p>
      <p className="text-lg mb-6 text-sky-700">
        I believe every living being deserves care. Through my personal effort, I feed cows, share meals, and offer basic support where I can. There is no formal organization or institutional structure behind this work.
      </p>
      <p className="text-lg mb-6 text-sky-700">
        Support from well-wishers helps me continue this seva. If you wish to join or contribute, you are welcome to help in simple, practical ways.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-6 text-sky-900">Purpose</h2>
      <p className="text-lg mb-6 text-sky-700">
        My purpose is to offer simple, direct help: feeding cows and sharing essentials with people who need support.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-6 text-sky-900">Vision</h2>
      <p className="text-lg mb-6 text-sky-700">
        I wish for a compassionate community where small acts of seva make everyday life easier for those in need.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-6 text-sky-900">Guiding Values</h2>
      <ul className="list-disc list-inside text-lg space-y-3 text-sky-700">
        <li><strong>Compassion:</strong> Caring for cows and people through personal effort.</li>
        <li><strong>Integrity:</strong> Being transparent and truthful about this being a personal initiative.</li>
        <li><strong>Simplicity:</strong> Focusing on small, meaningful actions.</li>
        <li><strong>Respect:</strong> Honoring dignity and privacy.</li>
      </ul>
      <p className="text-sm mt-4 text-yellow-800 bg-yellow-100 inline-block px-3 py-1 rounded">
        Not a government-registered NGO. This is a personal seva initiative.
      </p>
    </div>
</div>
  );
};

export default AboutUs;
