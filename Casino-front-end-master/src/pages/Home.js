import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardAnimation from "../components/CardAnimation.js";

import Footer from "../components/Footer";
import homeBg from "../assets/images/home-bg.jpg";
import SearchBox from "../components/searchbox";
import Card from "../components/Card";
import CasinoCard from "../components/CasinoCard";
import CategoryCard from "../components/CategoryCard";

import ExpertCard from "../components/ExpertCard";
import { getCasinos } from "../api/casinos.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import certified from "../assets/images/Certified.png";
import leftCircle from "../assets/images/lefteclipse.png";
import rightCircle from "../assets/images/righteclipse.png";
import GameIcon1 from "../assets/images/Game Icon.png";
import GameIcon2 from "../assets/images/Game Icon (1).png";
import GameIcon3 from "../assets/images/Game Icon (2).png";
import GameIcon4 from "../assets/images/Game Icon (3).png";



// Category images
import categoriesImg1 from "../assets/images/image15.png";
import categoriesImg2 from "../assets/images/image 16.png";
import categoriesImg3 from "../assets/images/image 17.png";
import categoriesImg4 from "../assets/images/image 18.png";
import categoriesImg5 from "../assets/images/image 19.png";
import categoriesImg6 from "../assets/images/image 20.png";
import CountryCasinoList from "../components/CountryCasinoList";

import CookieConsent from "../components/CookieConsent";

const Home = () => {
  const navigate = useNavigate();
  const [casinos, setCasinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("casinos");

  // Filtered casino states
  const [casinoFilteredData, setCasinoFilteredData] = useState([]);
  const [bonusFilteredData, setBonusFilteredData] = useState([]);
  const [gameFilteredData, setGameFilteredData] = useState([]);
  const [slotFilteredData, setSlotFilteredData] = useState([]);
  const [bettingFilteredData, setBettingFilteredData] = useState([]);
  const [certifiedCasinos, setCertifiedCasinos] = useState([]);
  const [hotCasinos, sethotCasinos] = useState([]);
  const [recentCasinos, setRecentCasinos] = useState([]);
 



  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", "G-J8M10SL43W");
    }
    // Change body background color
    document.body.style.backgroundColor = "#1e1e1e";
    let scrollTracked = false;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const scrollPercent = (scrollPosition / pageHeight) * 100;

      if (scrollPercent > 90 && !scrollTracked) {
        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "Engagement",
            event_label: window.location.pathname,
            value: scrollPercent.toFixed(2),
            non_interaction: true,
          });
        }
        scrollTracked = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: document.title,
        page_path: window.location.pathname,
      });
    }
    // Fetch casinos from backend
    const fetchCasinos = async () => {
      try {
        const data = await getCasinos();
        setCasinos(data);

        // Filter casinos based on tags and properties
        filterCasinosData(data);
      } catch (err) {
        setError(err.message || "Failed to load casinos");
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();

    // Cleanup function
    return () => {
      document.body.style.backgroundColor = null;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to filter casinos based on tags and properties
  const filterCasinosData = (casinosData) => {
    // Casino Tags for NEW ON MR GAMBLERS - Casinos section
    const casinoTags = [
      "Crypto Casino",
      "Online Casino",
      "Mobile Casino",
      "Newest Casino",
    ];

    // Bonus Tags for NEW ON MR GAMBLERS - Bonuses section
    const bonusTags = [
      "Latest Bonus",
      "Exclusive Bonus",
      "Welcome Bonus",
      "No Deposit",
      "Free Spins Bonus",
      "Cashback Bonus",
      "No Wagering Bonus",
    ];

    // Game Tags for NEW ON MR GAMBLERS - Games section
    const gameTags = [
      "Casino Games",
      "Table Games",
      "Card Games",
      "Dice Games",
      "Real Money Online Slots",
      "Poker",
      "Bingo",
      "Lottery Games",
      "Video Slots",
      "Classic Slots",
      "Progressive Slots",
      "New Slots",
    ];

    // Slot Tags for NEW ON MR GAMBLERS - Slots section
    const slotTags = [
      "Video Slots",
      "Classic Slots",
      "Progressive Slots",
      "New Slots",
      "Real Money Online Slots",
    ];

    // Betting Tags for NEW ON MR GAMBLERS - Betting section
    const bettingTags = [
      "Sports Betting",
      "New Betting Sites",
      "Bet Types",
      "Betting Bonuses",
      "Free Bets",
    ];

    // Filter casinos for each section
    const filteredCasinos = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => casinoTags.includes(tag))
    );

    const filteredBonuses = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => bonusTags.includes(tag))
    );

    const filteredGames = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => gameTags.includes(tag))
    );

    // Filter slots casinos
    const filteredSlots = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => slotTags.includes(tag))
    );

    // Filter betting casinos
    const filteredBetting = casinosData.filter(
      (casino) =>
        casino.tags && casino.tags.some((tag) => bettingTags.includes(tag))
    );

    // Filter certified casinos
    const filteredCertified = casinosData.filter(
      (casino) => casino.certifiedCasino === true
    );

    // Get recent casinos (last 5 added, sorted by creation date)
    const sortedByDate = [...casinosData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Set filtered data
    setCasinoFilteredData(filteredCasinos.slice(0, 5));
    setBonusFilteredData(filteredBonuses.slice(0, 5));
    setGameFilteredData(filteredGames.slice(0, 5));
    setSlotFilteredData(filteredSlots.slice(0, 5));
    setBettingFilteredData(filteredBetting.slice(0, 5));
    sethotCasinos(filteredCertified.slice(0, 6));
    setCertifiedCasinos(filteredCertified.slice(0, 4));
    setRecentCasinos(sortedByDate.slice(0, 5));
  };

const categories = [
  { icon: categoriesImg1, label: "Casino Review", link: "/casinos/certified" },
  { icon: categoriesImg2, label: "Newest Casino", link: "/casinos/newest" },
  { icon: categoriesImg3, label: "Video Reviews", link: "/slots/video" }, // Define this route if needed
  { icon: categoriesImg4, label: "Bonuses", link: "/betting/bonuses" }, // Create this route if needed
  { icon: categoriesImg5, label: "Mobile Casinos", link: "/casinos/mobile" },
  { icon: categoriesImg6, label: "Instant Play", link: "/games/lottery" }, // Create this route if needed
];



 

  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const casinosPerPage = 10;
  const totalPages = Math.ceil(casinos.length / casinosPerPage);
  const indexOfLastCasino = currentPage * casinosPerPage;
  const indexOfFirstCasino = indexOfLastCasino - casinosPerPage;
  const currentCasinos = casinos.slice(indexOfFirstCasino, indexOfLastCasino);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to get current section data
  const getCurrentSectionData = () => {
    switch (activeSection) {
      case "casinos":
        return casinoFilteredData;
      case "bonuses":
        return bonusFilteredData;
      case "games":
        return gameFilteredData;
      case "Slot":
        return slotFilteredData;
      case "Betting":
        return bettingFilteredData;
      default:
        return casinoFilteredData;
    }
  };
  const cards = getCurrentSectionData(); // Now it's safe to use
  const isScrollable = cards.length >= 6;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black100">
        <div className="text-white text-2xl">Loading casinos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black100">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <header
        className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black100 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="container mx-auto text-center absolute z-10 top-5 h-full flex flex-col justify-center items-center px-2">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-white"
              style={{
                fontFamily: "BigNoodleTitling",
                lineHeight: "1.2",
                wordSpacing: "0.1em",
                fontWeight: "100",
                letterSpacing: "0.05em",
              }}
            >
              Your Gateway to the Best Online Casinos & Big Wins!
            </h1>
            <p
              className="mt-4 text-md md:text-lg max-w-2xl text-gray-200"
              style={{
                fontFamily: "BigNoodleTitling",
                lineHeight: "1.4",
                wordSpacing: "0.1em",
                fontWeight: "300",
                letterSpacing: "0.05em",
              }}
            >
              Compare top-rated casino platforms, claim exclusive bonuses, and
              start playing today!
            </p>
            <div className="m-10">
              <SearchBox />
            </div>
          </div>
          <CardAnimation />
        </div>


      </header>

      <section className="py-10 bg-black100 text-center">
        <h2
          className="text-3xl md:text-5xl mb-8 text-white"
          style={{
            fontFamily: "BigNoodleTitling",
            wordSpacing: "0.1em",
            fontWeight: "300",
            letterSpacing: "0.05em",
          }}
        >
          NEW ON MR GAMBLERS
        </h2>
        <div className="w-full overflow-x-auto px-4">
          <div
            className="inline-flex mb-10 space-x-0 text-bold justify-center w-max whitespace-nowrap"
            style={{
              fontFamily: "BigNoodleTitling",
              wordSpacing: "0.1em",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}
          >
            <button
              onClick={() => handleSectionChange("casinos")}
              className={`${activeSection === "casinos"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white scale-125 py-4 px-8 sm:px-16"
                : "bg-white text-red-800"
                } py-3 px-6 sm:px-14 text-xl sm:text-3xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-125 hover:py-4 hover:px-8 sm:hover:px-16 transition-all duration-300 ease-in-out`}
            >
              Casinos
            </button>

            <button
              onClick={() => handleSectionChange("bonuses")}
              className={`${activeSection === "bonuses"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white scale-125 py-4 px-8 sm:px-16"
                : "bg-white text-red-800"
                } py-3 px-6 sm:px-14 text-xl sm:text-3xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-125 hover:py-4 hover:px-8 sm:hover:px-16 transition-all duration-300 ease-in-out`}
            >
              Bonuses
            </button>

            <button
              onClick={() => handleSectionChange("games")}
              className={`${activeSection === "games"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white scale-125 py-4 px-8 sm:px-16"
                : "bg-white text-red-800"
                } py-3 px-6 sm:px-14 text-xl sm:text-3xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-125 hover:py-4 hover:px-8 sm:hover:px-16 transition-all duration-300 ease-in-out`}
            >
              Games
            </button>

            <button
              onClick={() => handleSectionChange("Slot")}
              className={`${activeSection === "Slot"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white scale-125 py-4 px-8 sm:px-16"
                : "bg-white text-red-800"
                } py-3 px-6 sm:px-14 text-xl sm:text-3xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-125 hover:py-4 hover:px-8 sm:hover:px-16 transition-all duration-300 ease-in-out`}
            >
              Slots
            </button>

            <button
              onClick={() => handleSectionChange("Betting")}
              className={`${activeSection === "Betting"
                ? "bg-gradient-to-r from-red-500 to-red-700 text-white scale-125 py-4 px-8 sm:px-16"
                : "bg-white text-red-800"
                } py-3 px-6 sm:px-14 text-xl sm:text-3xl hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:text-white hover:scale-125 hover:py-4 hover:px-8 sm:hover:px-16 transition-all duration-300 ease-in-out`}
            >
              Betting
            </button>
          </div>
        </div>


         <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-5">

         
              {getCurrentSectionData().map((casino) => (
               
                  <Card
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
              
              ))}
            </div>
          </div>
    



      </section>

      <section>
        <div
          className="flex flex-col m-10 items-center justify-center"
          style={{
            fontFamily: "BigNoodleTitling",
            lineHeight: "1.2",
            wordSpacing: "0.1em",
            fontWeight: "100",
            letterSpacing: "0.05em",
          }}
        >
          <h2 className="text-3xl md:text-3xl lg:text-5xl mt-10 max-w-5xl text-white">
            ARE YOU IN?
          </h2>

          <div className="relative mt-6 w-full max-w-4xl ">
            <div className="absolute inset-x-0 -top-4 flex justify-center z-10">
              <p className="relative bg-[#1d1d1d] text-red-600 m-5 md:text-lg lg:text-2xl text-center px-8 py-2 z-10">
                TABLE GAMING AT MR GAMBLERS
              </p>
            </div>

            <div
              className="absolute inset-0 m-5 border-4 border-red-600 rounded-xl"
              style={{
                boxShadow:
                  "0 4px 10px rgba(255, 0, 0, 0.5), inset 0 0 15px rgba(255, 0, 0, 0.3)",
              }}
            ></div>

            <div className="flex flex-wrap justify-around m-10  items-center py-8 px-6 ">
              <div className="text-center text-gray-400 mb-4  md:mb-0">
                <div
                  className="mb-0 w-20 h-20"
                  style={{
                    backgroundImage: `url(${GameIcon1})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "120px",
                    height: "120px",
                  }}
                ></div>
                <span>POKER</span>
              </div>

              <div className="text-center text-gray-400 mb-4 md:mb-0">
                <div
                  className="mb-2 w-20 h-20"
                  style={{
                    backgroundImage: `url(${GameIcon2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "120px",
                    height: "120px",
                  }}
                ></div>
                <span>PURE 21.5 BLACKJACK</span>
              </div>

              <div className="text-center text-gray-400 mb-4 md:mb-0">
                <div
                  className="mb-2 w-20 h-20"
                  style={{
                    backgroundImage: `url(${GameIcon3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "120px",
                    height: "120px",
                  }}
                ></div>
                <span>BACCARAT</span>
              </div>

              <div className="text-center text-gray-400 mb-4 md:mb-0">
                <div
                  className="mb-2 w-20 h-20"
                  style={{
                    backgroundImage: `url(${GameIcon4})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "120px",
                    height: "120px",
                  }}
                ></div>
                <span>AKA PAI GOW POKER</span>
              </div>

              <div className="text-center text-gray-400">
                <div
                  className="mb-2 w-20 h-20"
                  style={{
                    backgroundImage: `url(${GameIcon1})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "120px",
                    height: "120px",
                  }}
                ></div>
                <span>PAI GOW TILES</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black100 text-center py-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${leftCircle}), url(${rightCircle})`,
            backgroundPosition: "0 100%, 100% 0",
            backgroundRepeat: "no-repeat",
            backgroundSize: "800px 600px, 800px 600px",
          }}
        ></div>

        <div className="relative z-10">
          <h2
            className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-6xl text-white"
            style={{
              fontFamily: "BigNoodleTitling",
              lineHeight: "1.2",
              wordSpacing: "0.1em",
              fontWeight: "100",
              letterSpacing: "0.05em",
            }}
          >
            HOT CASINO CATEGORIES
          </h2>

          <div className="flex justify-center mb-10 rounded-2xl mx-auto max-w-[900px] p-10 bg-green-800 sm:mx-6 mx-8 lg:mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  icon={category.icon}
                  label={category.label}
                  link = {category.link}
                />
              ))}
            </div>
          </div>

          <h2
            className="text-3xl font-bold text-white mb-10 mt-40 text-2xl md:text-3xl lg:text-4xl text-white"
            style={{
              fontFamily: "BigNoodleTitling",
              lineHeight: "1.2",
              wordSpacing: "0.1em",
              fontWeight: "100",
              letterSpacing: "0.05em",
            }}
          >
            RECOMMENDED BY OUR EXPERTS
          </h2>

          <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
             {hotCasinos.map((casino) => (
               
                  <ExpertCard
                    name={casino.name}
                    logo={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
              
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex mt-10 flex-col items-center">
          <div
            className="relative text-white p-10 w-full max-w-full"
            style={{
              background: "linear-gradient(to right, #1A008E, #070028)",
            }}
          >
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
              <img
                src={certified}
                alt="Certified"
                className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4"
              />
              <h2
                className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
                style={{
                  fontFamily: "BigNoodleTitling",
                  lineHeight: "1.2",
                  wordSpacing: "0.1em",
                  fontWeight: "100",
                  letterSpacing: "0.05em",
                }}
              >
                Certified Casinos
              </h2>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 m-10 mt-5">
                {certifiedCasinos.map((casino) => (
                  <Card
                    key={casino._id}
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
                ))}
                {certifiedCasinos.length === 0 && (
                  <div className="col-span-full text-white text-lg">
                    No certified casinos found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex flex-col items-center">
          <div className="relative text-white bg-black100 p-10 w-full max-w-full">
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
              <h2
                className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
                style={{
                  fontFamily: "BigNoodleTitling",
                  lineHeight: "1.2",
                  wordSpacing: "0.1em",
                  fontWeight: "100",
                  letterSpacing: "0.05em",
                }}
              >
                Recently Added on MR Gamblers
              </h2>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-5">
                {recentCasinos.map((casino) => (
                  <Card
                    key={casino._id}
                    name={casino.name}
                    rating={casino.rating}
                    bgImage={casino.logo}
                    onClick={() => handlePlayClick(casino.name)}
                  />
                ))}
                {recentCasinos.length === 0 && (
                  <div className="col-span-full text-white text-lg">
                    No recent casinos found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-black100">
        <CountryCasinoList />
      </section>

      <section className="py-12 md:py-16 bg-black100">
        <div className="container mx-auto px-4">
          <div className="flex flex-row sm:flex-row justify-center items-center text-center ">
            <h2
              className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white"
              style={{
                fontFamily: "BigNoodleTitling",
                lineHeight: "1.2",
                wordSpacing: "0.1em",
                fontWeight: "100",
                letterSpacing: "0.05em",
              }}
            >
              ALL ONLINE CASINOS
            </h2>
          </div>
          <div className="space-y-6">
            {currentCasinos.map((casino, index) => (
              <CasinoCard
                key={casino._id}
                number={(currentPage - 1) * casinosPerPage + index + 1} // ✅ Continuous numbering
                image={casino.logo}
                title={casino.name}
                depositBonus={
                  casino.depositBonus || "Up to €1000 + 200 Free Spins"
                }
                welcomeBonus={casino.welcomeBonus || "200% Match Bonus"}
                rating={casino.rating}
                visits={`${casino.visits || 0}`}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <FaChevronLeft className="w-5 h-5 text-white" />
            </button>

            <span className="text-white text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            >
              <FaChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </>
  );
};

export default Home;
