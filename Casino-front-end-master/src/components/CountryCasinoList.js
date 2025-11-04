import React, { useState, useEffect } from "react";
import Card from "./Card";
import { getCasinos } from "../api/casinos.js";
import globalIcon from "../assets/icon/global.png";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "./CardSkeleton.js";

const countries = [
   { name: "India", code: "in" },
  { name: "Canada", code: "ca" },
  { name: "United States", code: "us" },
  { name: "Australia", code: "au" },
  { name: "New Zealand", code: "nz" },
  { name: "Austria", code: "at" },
  { name: "Finland", code: "fi" },
  { name: "Germany", code: "de" },
  { name: "Ireland", code: "ie" },
  { name: "Netherlands", code: "nl" },
  { name: "Norway", code: "no" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "United Kingdom (UK)", code: "gb" },
  { name: "European Countries (General)", code: "eu" },
  { name: "Global", code: "global" },
];

const CountryCasinoList = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Global");
  const [selectedCode, setSelectedCode] = useState("global");
  const [allCasinos, setAllCasinos] = useState([]);
  const [filteredCasinos, setFilteredCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 25;

  // Fetch all casinos on component mount
  useEffect(() => {
    const fetchCasinos = async () => {
      try {
        setLoading(true);
        const data = await getCasinos();
        setAllCasinos(data);
        // Initially filter for the default country
        filterCasinosByCountry(data, selectedCountry);
      } catch (err) {
        setError(err.message || "Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();
  }, []);

  const handlePlayClick = (name, isNewTab = false) => {
    const path = `/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`;
    if (isNewTab) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  // Filter casinos by selected country
  const filterCasinosByCountry = (casinos, country) => {
    // If "Global" is selected, show all casinos
    if (country === "Global") {
      setFilteredCasinos(casinos);
      return;
    }

    // Otherwise filter by available countries
    const filtered = casinos.filter(
      (casino) =>
        casino.availableCountries && casino.availableCountries.includes(country)
    );

    setFilteredCasinos(filtered);
    // Reset to first page when filtering
    setCurrentPage(1);
  };

  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const selected = countries.find((c) => c.name === selectedCountryName);

    setSelectedCountry(selected.name);
    setSelectedCode(selected.code);

    // Filter casinos based on newly selected country
    filterCasinosByCountry(allCasinos, selected.name);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredCasinos.length / casinosPerPage);
  const startIndex = (currentPage - 1) * casinosPerPage;
  const endIndex = startIndex + casinosPerPage;
  const currentCasinos = filteredCasinos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show a loading message while fetching data
  if (loading) {
    return (
      <div className="text-white text-center py-10">
        <p>Loading casinos...</p>
      </div>
    );
  }

  // Show an error message if fetching fails
  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="text-white px-4 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold uppercase mb-2">
          Find Casinos by Country
        </h1>
        <p className="italic mb-8 text-lg text-gray-300">
          Browse top-rated casinos available in your region for the best
          experience and localized offers.
        </p>

        {/* Country Dropdown */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <div className="flex items-center bg-white text-black px-4 py-2 rounded-md w-full sm:w-80">
            <img
              src={selectedCountry === "Global" ? globalIcon : `https://flagcdn.com/w40/${selectedCode}.png`}
              alt="flag"
              className="w-4 h-4 mr-2"
            />
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent outline-none w-full text-black"
              aria-label="Select country to filter casinos"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Casino Grid using Card Component */}
        {loading
      ? Array.from({ length: 5 }).map((_, idx) => <CardSkeleton key={idx} />):filteredCasinos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center place-items-center mb-8">
              {currentCasinos.map((casino) => {
                // Create a URL-friendly slug from the casino name
                const slug = casino.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "");
                
                return (
                  <Card
                    key={casino._id}
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    flagCode={selectedCode}
                    onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Previous page"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="text-white text-lg">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  aria-label="Next page"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-gray-300">
              No casinos available for {selectedCountry}.
            </p>
            <p className="mt-2">Try selecting a different country.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryCasinoList;
