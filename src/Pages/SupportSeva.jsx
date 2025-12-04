import { FaHeart, FaCow, FaUtensils, FaShirt, FaIndianRupeeSign } from 'react-icons/fa6';

import { Helmet } from 'react-helmet-async';

const SupportSeva = () => {
  return (
    <div className="p-10 bg-white rounded-lg shadow">
      <Helmet>
        <title>Support My Seva – Kanhaseva</title>
        <meta name="description" content="Support personal seva: cow feeding, meal sharing, and essentials." />
        <link rel="canonical" href="https://kanhasevain.vercel.app/support" />
        <meta property="og:title" content="Support My Seva – Kanhaseva" />
        <meta property="og:description" content="Contribute to personal seva efforts." />
        <meta property="og:url" content="https://kanhasevain.vercel.app/support" />
        <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="text-3xl font-bold text-sky-900 mb-4">Support My Seva</h1>
      <p className="text-sky-700 mb-6">KanhaSeva.in is a personal seva initiative, where I dedicate my time and resources to feeding cows, distributing meals to the needy, and sharing essential items with underprivileged families. This is not a registered NGO — it is simply my way of giving back and helping those in need. Your voluntary contribution directly supports these activities and helps me continue this work with consistency and compassion.</p>

      <h2 className="text-2xl font-semibold text-sky-900 mb-3">How Your Contribution Helps</h2>
      <div className="space-y-6">
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sky-800 font-semibold mb-2"><FaCow /> Cow Feeding</div>
          <ul className="list-disc ml-6 text-sky-700">
            <li>Buy fodder, fruits, grains, and supplements</li>
            <li>Provide clean drinking water</li>
            <li>Assist weak or injured cows whenever possible</li>
          </ul>
        </div>
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sky-800 font-semibold mb-2"><FaUtensils /> Meals for the Needy</div>
          <ul className="list-disc ml-6 text-sky-700">
            <li>Buying groceries and cooking ingredients</li>
            <li>Preparing meals for children, elders, and families in need</li>
            <li>Conducting small community food distribution drives</li>
          </ul>
        </div>
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-sky-800 font-semibold mb-2"><FaShirt /> Clothing & Essentials</div>
          <ul className="list-disc ml-6 text-sky-700">
            <li>Provide clothes, blankets, and basic necessities</li>
            <li>Support children with stationery and small needs</li>
            <li>Share essential items with families who require assistance</li>
          </ul>
        </div>
      </div>

      <p className="text-sky-700 mt-6">Every rupee is used directly toward seva activities.</p>

      <h2 className="text-2xl font-semibold text-sky-900 mt-8 mb-3">Contribute Through UPI / Bank Transfer</h2>
      <div className="bg-sky-50 rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-2 text-sky-800 font-semibold"><FaIndianRupeeSign /> UPI</div>
        {/* <div className="text-sky-700">UPI ID: yourupi@bank</div> */}
        {/* <div className="text-sky-700">QR Code: Insert your QR code image here</div> */}
        <div className="flex items-center gap-2 text-sky-800 font-semibold"><FaIndianRupeeSign /> Bank Transfer</div>
        {/* <ul className="list-disc ml-6 text-sky-700">
          <li>Name: Your Name</li>
          <li>Account No: XXXXXXXX</li>
          <li>IFSC: XXXXXXXX</li>
          <li>Bank: Your Bank Name</li>
        </ul> */}
        {/* <div className="text-xs text-gray-600">Replace all placeholders with your actual details.</div> */}
        <div className="flex items-center gap-2 text-sky-800 font-semibold">Contact me on any  Social Media to Donate amount as you wish</div>

      </div>

      <h2 className="text-2xl font-semibold text-sky-900 mt-8 mb-3">Transparency Promise</h2>
      <ul className="list-disc ml-6 text-sky-700">
        <li>Cow feeding activities</li>
        <li>Meal preparation and distribution</li>
        <li>Clothing and essentials sharing</li>
        <li>Items purchased from contributions</li>
      </ul>

      <h2 className="text-2xl font-semibold text-sky-900 mt-8 mb-3">Important Legal Note</h2>
      <p className="text-sky-700">KanhaSeva.in is NOT a registered NGO, trust, society, or Section 8 company. This is a personally managed seva initiative. All contributions are voluntary and support my personal efforts to help cows and underprivileged individuals. No tax exemption (80G/12A) is applicable.</p>
      <p className="text-sky-700 mt-2">This disclaimer keeps everything legal and safe.</p>

      <h2 className="text-2xl font-semibold text-sky-900 mt-8 mb-3">Acknowledgment</h2>
      <p className="text-sky-700">If you contribute, you may send a screenshot on WhatsApp or email for confirmation. I will send a simple thank-you message in return.</p>

      <div className="mt-8 flex items-center gap-2 text-sky-800 font-semibold"><FaHeart /> Thank You</div>
      <p className="text-sky-700">Thank you for supporting this seva. Your kindness helps feed cows, provide food to the needy, and bring comfort to those who need it most. Together, even small acts can create a meaningful impact.</p>
    </div>
  );
};

export default SupportSeva;
