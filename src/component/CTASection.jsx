import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { trackClick } from "../analytics";

const CTASection = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <section className="w-full flex justify-center items-center my-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-11/12 flex flex-col md:flex-row items-center justify-between p-6 bg-sky-100 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-sky-900 mb-4 md:mb-0">
          Let’s Make a Difference Together
        </h2>
        <motion.button
          onClick={() => { trackClick('cta_donate'); handleDonateClick(); }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-sky-600 transition"
        >
          Donate Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTASection;
