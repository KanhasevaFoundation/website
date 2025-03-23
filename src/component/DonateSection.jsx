import { FaCow, FaUtensils, FaShirt } from "react-icons/fa6"; // Using react-icons for example

const DonateSection = () => (
  <section className="text-center p-8 bg-sky-50">
    <h3 className="text-2xl font-bold text-sky-900 mb-6">What We Provide</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto w-10/12">
      {/* Cow Feeding */}
      <div className="rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="text-sky-600 text-4xl mb-4 flex justify-center">
          <FaCow />
        </div>
        <div className="text-sky-600 text-xl font-semibold">Cow Feeding</div>
        <p className="text-gray-600 mt-2">
          Providing nutritious food and care for cows, ensuring their well-being.
        </p>
      </div>

      {/* Food for the Poor */}
      <div className="rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="text-sky-600 text-4xl mb-4 flex justify-center">
          <FaUtensils />
        </div>
        <div className="text-sky-600 text-xl font-semibold">Food for the Poor</div>
        <p className="text-gray-600 mt-2">
          Distributing nourishing meals to underprivileged communities.
        </p>
      </div>

      {/* Clothing and Essentials */}
      <div className="rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="text-sky-600 text-4xl mb-4 flex justify-center">
          <FaShirt />
        </div>
        <div className="text-sky-600 text-xl font-semibold">Clothing & Essentials</div>
        <p className="text-gray-600 mt-2">
          Providing warm clothing and basic necessities to those in need.
        </p>
      </div>
    </div>
  </section>
);

export default DonateSection;