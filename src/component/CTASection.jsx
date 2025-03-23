import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <section className="w-full flex justify-center items-center my-8">
      <div className="w-11/12 flex flex-col md:flex-row items-center justify-between p-6 bg-sky-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-sky-900 mb-4 md:mb-0">
          Let’s Make a Difference Together
        </h2>
        <button
          onClick={handleDonateClick}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg shadow hover:bg-sky-600 transition"
        >
          Donate Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;