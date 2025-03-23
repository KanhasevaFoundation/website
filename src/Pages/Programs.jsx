const OurPrograms = () => {
  return (
    <div className="p-8 bg-sky-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-sky-900">Our Programs</h1>

      {/* Cow Feeding Program */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">1. Cow Feeding Program</h2>
        <p className="text-sky-700">
          Our Cow Feeding Program focuses on providing nutritious food and care to cows. We work with local communities and volunteers to ensure that cows are well-fed and healthy.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">How It Works:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Partnerships: We collaborate with local farmers and communities to identify cows in need.</li>
          <li>Food Collection: We collect and distribute high-quality fodder and supplements for cows.</li>
          <li>Care and Support: Our team ensures that cows receive regular check-ups and medical care.</li>
          <li>Awareness: We promote awareness about the importance of cow welfare in our community.</li>
        </ul>
        <h4 className="font-semibold text-sky-800">Benefits:</h4>
        <ul className="list-disc ml-6 text-sky-700">
          <li>Improves the health and well-being of cows.</li>
          <li>Supports local farmers and communities.</li>
          <li>Promotes sustainable and ethical practices.</li>
        </ul>
      </section>

      {/* Meal Distribution Program */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">2. Meal Distribution Program</h2>
        <p className="text-sky-700">
          Our Meal Distribution Program aims to provide hot, nutritious meals to underprivileged communities. We partner with local chefs and volunteers to prepare and deliver meals to those in need.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">Key Features:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Weekly Meal Deliveries: Hot meals are prepared and delivered weekly to underserved areas.</li>
          <li>Community Events: We organize community meal events to foster togetherness and support.</li>
          <li>Nutritional Education: Providing educational resources on healthy eating and cooking practices.</li>
        </ul>
      </section>

      {/* Donation Drives */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">3. Donation Drives</h2>
        <p className="text-sky-700">
          We organize regular donation drives to collect essential items such as clothing, toiletries, and school supplies for individuals and families in need. Our goal is to provide necessary resources that can help improve their quality of life.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">How You Can Help:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Host a Drive: Organize a donation drive in your community, workplace, or school.</li>
          <li>Volunteer: Join us in sorting and distributing donated items to those in need.</li>
          <li>Spread the Word: Share information about our drives to encourage community participation.</li>
        </ul>
      </section>

      {/* Community Workshops */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">4. Community Workshops</h2>
        <p className="text-sky-700">
          Our Community Workshops are designed to empower individuals with skills and knowledge. We offer a variety of workshops on topics such as financial literacy, job readiness, and health and wellness.
        </p>
        <h3 className="font-semibold mt-4 text-sky-800">Workshop Highlights:</h3>
        <ul className="list-disc ml-6 mb-4 text-sky-700">
          <li>Skill Development: Learn valuable skills that can enhance employability and personal growth.</li>
          <li>Support Networks: Connect with community members and build supportive networks.</li>
          <li>Guest Speakers: Hear from experts in various fields who can provide insights and guidance.</li>
        </ul>
      </section>

      {/* Get Involved */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">Get Involved</h2>
        <p className="text-sky-700">
          Join us in our mission to create a supportive and sustainable community. Whether you are interested in volunteering, donating, or participating in our programs, there are many ways to get involved. Together, we can make a difference!
        </p>
      </section>

      {/* Contact Us */}
      <section className="text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-sky-800">Contact Us</h2>
        <p className="text-sky-700">
          If you would like more information about our programs or how to get involved, please reach out to us at 
          <a href="mailto:contact@kanhaseva.in" className="text-sky-600 hover:underline"> contact@kanhaseva.in</a> or call us at (123) 456-7890.
        </p>
      </section>
    </div>
  );
};

export default OurPrograms;