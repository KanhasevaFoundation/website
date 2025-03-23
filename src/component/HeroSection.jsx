import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donate");
  };

  // Cloudinary URL for the banner image
  const bannerImage = "https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto/zyl1uaew9acfn6jxkhvy";

  return (
    <section className="w-full flex justify-center py-8 bg-sky-50">
      <div className="w-11/12 relative rounded-lg shadow-lg overflow-hidden">
        {/* Banner Image */}
        <img
          src={bannerImage} // Use the Cloudinary URL here
          alt="KanhaSeva.in Banner"
          className="w-full h-auto object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-60 stroke-black stroke-2 flex flex-col justify-center items-center text-center p-4">
          {/* Heading with Shadow */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Feed Cows, Help the Poor
          </h1>

          {/* Paragraph with Shadow */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl drop-shadow-md">
            Join us in our mission to provide nourishment to cows and support underprivileged communities. Together, we can make a difference.
          </p>

          {/* Button with Shadow and Hover Effect */}
          <button
            onClick={handleDonateClick}
            className="bg-sky-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all duration-300"
          >
            Donate Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;