import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import casinoBg from '../assets/images/casino-bg.png';
import SearchBox from '../components/searchbox';
import Card from '../components/Card';
import API from "../api/axios";
import ExpertCard from '../components/ExpertCard';

import categoriesImg1 from '../assets/images/image15.png';
import categoriesImg2 from '../assets/images/image 16.png';
import categoriesImg3 from '../assets/images/image 17.png';
import categoriesImg4 from '../assets/images/image 18.png';
import categoriesImg5 from '../assets/images/image 19.png';
import categoriesImg6 from '../assets/images/image 20.png';

import certified from '../assets/images/Certified.png';
import Footer from "../components/Footer";

import leftCircle from "../assets/images/lefteclipse.png";
import rightCircle from "../assets/images/righteclipse.png";

const sectionIds = [
  "what-is-mobile-casino",
  "how-we-rank",
  "licensing",
  "interface",
  "software-providers",
  "payment-methods",
  "customer-support",
  "mobile-optimisation",
  "reputation",
  "are-mobile-casinos-safe"
];

const sectionTitles = [
  "What Is a Mobile Casino?",
  "How We Rank the Best Mobile Casino Sites",
  "Licensing",
  "Interface",
  "Software Providers",
  "Payment Methods",
  "Customer Support",
  "Mobile Optimisation",
  "Reputation",
  "Are Mobile Casinos Safe?"
];

const Casinos = ({ type }) => {
  const [casinosData, setCasinosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const fetchCasinos = async () => {
      setLoading(true);
      try {
        const response = await API.get("/casinos");
        setCasinosData(response.data);
        filt(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();
  }, [type]);
  
  const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };
  const [filteredData, setFilteredData] = useState([]);
  const [hotCasinos, setHotCasinos] = useState([]);
  const [recommendedByExpertss, setrecommendedByExperts] = useState([]);
  const [certifiedCasinos, setcertifiedCasinos] = useState([]);

  function filt(data) {
    if (!type || typeof type !== "string") return;

    // Filter all by tag first
    const tagFiltered = data.filter(
      casino =>
        Array.isArray(casino.tags) &&
        casino.tags.some(tag => tag.toLowerCase().includes(type.toLowerCase()))
    );


    // Now filter by specific flags *within* the tag-matching data
    const hot = tagFiltered.filter(casino => casino.hotCasino === true);
    const recExperts = tagFiltered.filter(casino => casino.recommendedByExperts === true);
    const certified = tagFiltered.filter(casino => casino.certifiedCasino === true);

    setFilteredData(tagFiltered);
    setHotCasinos(hot);
    setrecommendedByExperts(recExperts);
    setcertifiedCasinos(certified);
  }

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0];
      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { icon: categoriesImg1, label: 'Casino Review' },
    { icon: categoriesImg2, label: 'Newest Casino' },
    { icon: categoriesImg3, label: 'Video Reviews' },
    { icon: categoriesImg4, label: 'Awarded Casinos' },
    { icon: categoriesImg5, label: 'Mobile Casinos' },
    { icon: categoriesImg6, label: 'Instant Play' },
  ];

  return (
    <>
      <Navbar />

      <header
        className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
        style={{ backgroundImage: `url(${casinoBg})` }}
      >
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black100 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">

          <div className="container mx-auto text-center absolute z-10 top-5 h-full flex flex-col justify-center items-center px-2">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl max-w-4xl text-white"
              style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '100',
                letterSpacing: '0.05em',
              }}
            >
              Your Gateway to the Best Online Casinos & Big Wins!
            </h1>
            <p
              className="mt-4 text-md md:text-lg max-w-2xl text-gray-200"
              style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.4',
                wordSpacing: '0.1em',
                fontWeight: '300',
                letterSpacing: '0.05em',
              }}
            >
              Compare top-rated casino platforms, claim exclusive bonuses, and start playing today!
            </p>
            <div className="m-10">
              <SearchBox />
            </div>
          </div>
        </div>
      </header>

      <section className="py-10 bg-black100 text-center">
        <h2 className="text-3xl text-white font-semibold mb-6">Top Casinos</h2>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-0">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              filteredData.slice(0, 5).map((casino, index) => (
                <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)} />
              ))
            )}
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {hotCasinos.slice(0, 4).map((casino, index) => (
                <ExpertCard key={index} logo={casino.logo} name={casino.name} onClick={() => handlePlayClick(casino.name)} />
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
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                recommendedByExpertss.slice(0, 6).map((casino, index) => (
                 <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>


      <section className="py-10 bg-black100 text-center">
        <div className="flex  mt-10 flex-col items-center ">
          <div
            className="relative text-white p-10 w-full max-w-full"
            style={{
              background: "linear-gradient(to right, #1A008E, #070028)",
            }}
          >
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">
              <img src={certified} alt="Certified" className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4" />
              <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white" style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '100',
                letterSpacing: '0.05em',
              }}>Certified Casinos</h2>
            </div>

            <div className="flex justify-center items-center">

              <div className="flex justify-center items-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    certifiedCasinos.slice(0, 6).map((casino, index) => (
                     <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={() => handlePlayClick(casino.name)} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-10 bg-black100 text-center">
        <div className="flex  flex-col items-center ">
          <div
            className="relative text-white bg-black100 p-10 w-full max-w-full"

          >
            <div className="flex flex-row sm:flex-row justify-center items-center text-center mb-10">

              <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl text-white" style={{
                fontFamily: 'BigNoodleTitling',
                lineHeight: '1.2',
                wordSpacing: '0.1em',
                fontWeight: '100',
                letterSpacing: '0.05em',
              }}>Recently Added on MR Gamblers</h2>
            </div>

            <div className="flex justify-center items-center">

              <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    filteredData.slice(0, 6).map((casino, index) => (
                      <Card
                        key={index}
                        name={casino.name}
                        rating={casino.rating}
                        bgImage={casino.logo}
                        onClick={() => handlePlayClick(casino.name)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-10 flex justify-center px-[20px]">
          <aside className="w-1/4 p-6 hidden md:block sticky top-8 h-fit self-start">
            <nav>
              <h2 className="text-lg font-bold mb-4 text-white">Contents</h2>
              <ul className="space-y-2 text-left">
                {sectionIds.map((id, idx) => (
                  <li
                    key={id}
                    className={`cursor-pointer transition-colors hover:text-blue-400 ${activeSection === id ? "text-red-500  font-bold" : "text-white"}`}
                    onClick={() => {
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {sectionTitles[idx]}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        <div className="flex w-full max-w-6xl text-[white] rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar */}
          {/* Main Content */}
          <div className="w-full md:w-3/4 p-8 text-left text-[white]">
            <h1 id="what-is-mobile-casino" className="text-3xl font-bold mb-4 text-red-500">What Is a Mobile Casino?</h1>
            <p className="mb-6">
              A mobile casino is a web-based gambling site offering casino games of chance and skill for real on remote devices, including mobile phones, tablets, and smartphones. In other words, any online casino with a mobile version of its website where you can register and play mobile casino games is considered a phone casino.
              <br /><br />
              Since the introduction of the first-ever mobile casino in 2004, players were no longer restricted to their computers and could take their favourite games with them anywhere they went. These casino sites are optimised to work seamlessly on remote devices, with software compatible with iOS and Android platforms and, in some instances, Blackberry.
            </p>
            <h1 id="how-we-rank" className="text-2xl font-bold mb-2 text-red-500">How We Rank the Best Mobile Casino Sites</h1>
            <p>
              To bring you closer to the best mobile casinos, we employ CasinoRank, the industry-first automatic online casino ranking mechanism, followed by the word from our expert reviewers. Before we present our evaluation to players, we assess a set of criteria, and we try to do it consistently with every new mobile casino review:
            </p>
            <h3 id="licensing" className="text-xl font-semibold mt-6 mb-2">Licensing</h3>
            <p className="mb-4">Holding player safety to the highest priority, we promote only legitimate mobile casino sites carrying valid licences from any of the reputable gambling authorities, such as the UK Gambling Commission (UKGC), Malta Gaming Authority (MGA), Swedish Gambling Authority, etc.</p>
            <h3 id="interface" className="text-xl font-semibold mt-6 mb-2">Interface</h3>
            <p className="mb-4">The design of each smartphone casino, its features, user-friendliness, and user experience are all part of the equation determining whether a casino is worthy of our players' time.</p>
            <h3 id="software-providers" className="text-xl font-semibold mt-6 mb-2">Software Providers</h3>
            <p className="mb-4">For many players, the variety of casino game providers is crucial in choosing the top mobile casinos for real money. Therefore, our casino reviewers try to filter phone casinos relying on gaming studios specialising in mobile gaming.</p>
            <h3 id="payment-methods" className="text-xl font-semibold mt-6 mb-2">Payment Methods</h3>
            <p className="mb-4">Available banking methods are another aspect of best mobile casino sites, with casino operators going above and beyond to offer as many deposit methods as possible. Every mobile gambling platform review underlines the available payment methods, deposit and withdrawal limits and other details concerning money handling.</p>
            <h3 id="customer-support" className="text-xl font-semibold mt-6 mb-2">Customer Support</h3>
            <p className="mb-4">Customer service availability is essential for a pleasant gaming experience, so we test all avenues to reach the customer support the casino claims to offer.</p>
            <h3 id="mobile-optimisation" className="text-xl font-semibold mt-6 mb-2">Mobile Optimisation</h3>
            <p className="mb-4">Naturally, to even be considered a mobile casino, an online gambling site must be fully optimised for mobile, so our reviewers look at how seamlessly the website works on various platforms, including Android and iOS.</p>
            <h3 id="reputation" className="text-xl font-semibold mt-6 mb-2">Reputation</h3>
            <p className="mb-4">When it comes to mobile casinos' reputation, we rely on player reviews. Each phone casino review on our website contains a player review section, where registered users leave comments and discuss different aspects of online casinos.</p>
            <h1 id="are-mobile-casinos-safe" className="text-3xl font-bold mb-4 text-red-500">Are Mobile Casinos Safe?</h1>
            <p className="mb-6">
              Yes, it is perfectly safe to play at smartphone casinos as they use the latest security protocols to protect sensitive player data and utilise state-of-the-art technology to make transactions as secure as possible.
              <br /><br />
              Mobile casinos have even proven to be safer than online casinos. This is because platforms powering remote devices have better security than computers, minimising the chances of having your smartphone or tablet hacked.
              <br /><br />
              Also, the entire communication between your device and the casino occurs over an SSL-encrypted connection, keeping fraudsters away from your account and your withdrawals safe
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Casinos;