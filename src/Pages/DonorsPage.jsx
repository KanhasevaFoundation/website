import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { api } from '../apiClient';
import { Users, Phone, Coffee, DollarSign, Utensils } from "lucide-react";

const AdminDonorListPage = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch donations from the server
    api
      .get("/api/donations")
      .then((response) => {
        setDonations(response.data);
        setFilteredDonations(response.data);
      })
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDonations(donations);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredDonations(donations.filter(d => {
        const name = d.donorType === "Personal" ? d.personalDetails?.name : d.restaurantDetails?.name;
        const phone = d.donorType === "Personal" ? d.personalDetails?.phoneNumber : d.restaurantDetails?.contactNumber;
        return (name?.toLowerCase() || "").includes(lower) || (phone || "").includes(lower);
      }));
    }
  }, [searchTerm, donations]);

  // Get donor icon based on type
  const getDonorIcon = (donorType) => {
    if (donorType === "Personal") {
      return <Users className="inline-block mr-2" size={18} />;
    } else {
      return <Utensils className="inline-block mr-2" size={18} />;
    }
  };

  // Get donation type icon
  const getDonationTypeIcon = (donationType) => {
    if (donationType === "Money") {
      return <DollarSign className="inline-block mr-2" size={18} />;
    } else {
      return <Coffee className="inline-block mr-2" size={18} />;
    }
  };

  // Render donation type content
  const renderDonationType = (donation) => {
    if (donation.donorType === "Personal") {
      return (
        <>
          {getDonationTypeIcon(donation.donationType)}
          {donation.donationType}
        </>
      );
    } else {
      // For Restaurant, show a dash since they can't donate money
      return (
        <>
          <Coffee className="inline-block mr-2" size={18} />
          Food Items
        </>
      );
    }
  };

  // Render amount or food items
  const renderAmountOrFoodItems = (donation) => {
    if (donation.donorType === "Personal" && donation.donationType === "Money") {
      return (
        <>
          <DollarSign className="inline-block mr-2" size={18} />
          {donation.money}
        </>
      );
    } else if (donation.donorType === "Restaurant") {
      // For restaurants, show the food items as a list
      const foodItems = donation.restaurantDetails.foodItems;
      if (Array.isArray(foodItems)) {
        return (
          <ul className="list-disc list-inside text-left">
            {foodItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      } else {
        // If foodItems is not an array, just display it as is
        return foodItems || "-";
      }
    } else {
      // For personal non-money donations, show a dash
      return "-";
    }
  };

  // Render payment status
  const renderPaymentStatus = (donation) => {
    if (donation.donorType === 'Personal' && donation.donationType === 'Money') {
      const status = donation.status || 'Pending'; // Default to Pending if not set
      let colorClass = 'text-yellow-600 bg-yellow-100';
      if (status === 'Success') colorClass = 'text-green-600 bg-green-100';
      if (status === 'Failed') colorClass = 'text-red-600 bg-red-100';

      return (
        <div className="flex flex-col items-center">
          <span className={`font-semibold px-2 py-1 rounded-full text-xs ${colorClass}`}>{status}</span>
          {status === 'Failed' && donation.failureReason && (
            <span className="text-[10px] text-red-500 max-w-[120px] truncate mt-1" title={donation.failureReason}>
              {donation.failureReason}
            </span>
          )}
        </div>
      );
    }
    return <span className="text-green-600 bg-green-100 font-semibold px-2 py-1 rounded-full text-xs">Success</span>;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Helmet>
        <title>Donors – Admin</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://kanhasevain.vercel.app/donors" />
      </Helmet>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 py-6 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <Users className="inline-block mr-3" size={32} />
              Donor List
            </h1>
            <p className="text-sky-100 mt-1">Manage and view all donation records</p>
          </div>
          <div className="bg-white/20 px-4 py-2 rounded text-white font-mono">
            Total: {filteredDonations.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-sky-50 border-b">
          <input
            type="text"
            placeholder="Search by donor name or phone number..."
            className="w-full p-3 rounded-lg border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="px-6 py-3 text-left font-semibold">Donor Name</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">Phone</th>
                <th className="px-6 py-3 text-left font-semibold">Donation</th>
                <th className="px-6 py-3 text-left font-semibold">Details</th>
                <th className="px-6 py-3 text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredDonations.map((donation, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-sky-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {getDonorIcon(donation.donorType)}
                    {donation.donorType === "Personal"
                      ? donation.personalDetails.name
                      : donation.restaurantDetails.name}
                  </td>
                  <td className="px-6 py-4">
                    {donation.donorType}
                  </td>
                  <td className="px-6 py-4">
                    <Phone className="inline-block mr-2 text-sky-500" size={14} />
                    {donation.donorType === "Personal"
                      ? donation.personalDetails.phoneNumber
                      : donation.restaurantDetails.contactNumber}
                  </td>
                  <td className="px-6 py-4">
                    {renderDonationType(donation)}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {renderAmountOrFoodItems(donation)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderPaymentStatus(donation)}
                  </td>
                </tr>
              ))}
              {filteredDonations.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No donors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDonorListPage;
