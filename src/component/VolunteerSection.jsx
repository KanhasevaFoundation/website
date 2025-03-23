import { useNavigate } from "react-router-dom";

const VolunteerSection = () => {
  const navigate = useNavigate();

  const handleVolunteerClick = () => {
    navigate("/volunteers");
  };

  return (
    <section className="flex justify-center items-center my-8">
      <button
        onClick={handleVolunteerClick}
        className="bg-sky-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-sky-600 transition transform hover:scale-105"
      >
        Become a Volunteer
      </button>
    </section>
  );
};

export default VolunteerSection;