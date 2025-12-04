import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { api } from '../apiClient';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await api.post('/api/contact', formData);
      const data = response.data;
      setSuccessMessage(data.message || "Thank you for contacting us! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 bg-sky-50">
      <Helmet>
        <title>Contact Us – Kanhaseva</title>
        <meta name="description" content="Get in touch for volunteering or contribution inquiries." />
        <link rel="canonical" href="https://kanhasevain.vercel.app/contact" />
        <meta property="og:title" content="Contact Us – Kanhaseva" />
        <meta property="og:description" content="Reach out to Kanhaseva for questions or support." />
        <meta property="og:url" content="https://kanhasevain.vercel.app/contact" />
        <meta property="og:image" content="https://res.cloudinary.com/dfq1dytmn/image/upload/f_auto,q_auto,w_1200,h_630,c_fill/zyl1uaew9acfn6jxkhvy" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8 text-sky-900">Contact Us</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-sky-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-sky-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-sky-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="mt-1 p-2 w-full rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-600 transition disabled:bg-sky-300"
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>

          {/* Success and Error Messages */}
          {successMessage && (
            <p className="mt-4 text-green-600 text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-600 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
