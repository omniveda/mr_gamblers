import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import casinoBg from '../assets/images/games-bg.png';
import SearchBox from '../components/searchbox';
import Card from '../components/Card';
import ExpertCard from '../components/ExpertCard';
import API from "../api/axios";
import certified from '../assets/images/Certified.png';
import Footer from "../components/Footer";

import bingojson from '../allCasinoDetails/Games/bingo.json';
import cardgamesjson from '../allCasinoDetails/Games/cardgames.json';
import casinogamesjson from '../allCasinoDetails/Games/casinogames.json';
import lotteryjson from '../allCasinoDetails/Games/lottery.json';
import pokergamesjson from '../allCasinoDetails/Games/pokergames.json';
import realmoneyonlineslotsjson from '../allCasinoDetails/Games/realmoneyonlineslots.json';
import tablegamesjson from '../allCasinoDetails/Games/tablegames.json';

import leftCircle from "../assets/images/lefteclipse.png";
import rightCircle from "../assets/images/righteclipse.png";
import Card2 from "../components/Card2";
const TYPE_TO_TAG_MAP = {

  'casino': 'Casino Games',
  'table': 'Table Games',
  'card': 'Card Games',
  'dice': 'Dice Games',
  'real-money-slots': 'Real Money Online Slots',
  'poker': 'Poker',
  'bingo': 'Bingo',
  'lottery': 'Lottery Games',


};
const Games = ({ type }) => {
  const [casinosData, setCasinosData] = useState([]);
  const [cryptoData, setCryptoData] = useState(casinogamesjson);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('');
const navigate = useNavigate();
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    if (type === "casino") {
      setCryptoData(casinogamesjson);
    } else if (type === "table") {
      setCryptoData(tablegamesjson);
    } else if (type === "card") {
      setCryptoData(cardgamesjson);
    } else if (type === "dice") {
      setCryptoData(tablegamesjson);
    } else if (type === "Real Money Online Slots") {
      setCryptoData(realmoneyonlineslotsjson);
    } else if (type === "poker") {
      setCryptoData(pokergamesjson);
    } else if (type === "bingo") {
      setCryptoData(bingojson);
    } else if (type === "lottery"){
      setCryptoData(lotteryjson);
    }
     else {
      setCryptoData(casinogamesjson);
    }
  }, [type]);

  useEffect(() => {
    if (!cryptoData || !cryptoData.overview || cryptoData.overview.length === 0) {
      return;
    }
    const handleScroll = () => {
      let current = cryptoData.overview[0]?.heading.replace(/\s+/g, '-').toLowerCase();
      for (let item of cryptoData.overview) {
        const id = item.heading.replace(/\s+/g, '-').toLowerCase();
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
  }, [cryptoData]);

  useEffect(() => {
    const fetchCasinos = async () => {
      setLoading(true);
      try {
        const response = await API.get("/casinos", { params: { type } });
        setCasinosData(response.data);
        filterCasinos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCasinos();
  }, [type]);

  const handlePlayClick = (name, isNewTab = false) => {
    const path = `/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`;
    if (isNewTab) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };
const [hotCasinos, setHotCasinos] = useState([]);
const [recommendedByExpertss, setrecommendedByExperts] = useState([]);
const [certifiedCasinos, setcertifiedCasinos] = useState([]);

const filterCasinos = (data) => {
  // If no type is provided, use full data
  if (!type || typeof type !== "string") {
    setFilteredData(data);
    setHotCasinos(data.filter(casino => casino.hotCasino === true));
    setrecommendedByExperts(data.filter(casino => casino.recommendedByExperts === true));
    setcertifiedCasinos(data.filter(casino => casino.certifiedCasino === true));
    return;
  }

  // Determine tag filtering logic
  const exactTag = TYPE_TO_TAG_MAP[type];
  let tagFiltered = [];

  if (!exactTag) {
    const normalizedType = type.replace(/-/g, '').toLowerCase();

    tagFiltered = data.filter(casino => {
      if (!Array.isArray(casino.tags)) return false;

      return casino.tags.some(tag => {
        if (!tag) return false;
        const normalizedTag = tag.replace(/-/g, '').toLowerCase();

        return (
          normalizedTag.includes(normalizedType) ||
          normalizedType.includes(normalizedTag) ||
          normalizedTag === normalizedType
        );
      });
    });

    console.log(`Filtered for flexible type "${type}":`, tagFiltered);
  } else {
    tagFiltered = data.filter(
      casino => Array.isArray(casino.tags) && casino.tags.includes(exactTag)
    );

    console.log(`Filtered for exact type "${type}":`, tagFiltered);
  }

  // Set all filtered results based on tag-matched data
  setFilteredData(tagFiltered);
  setHotCasinos(tagFiltered.filter(casino => casino.hotCasino === true));
  setrecommendedByExperts(tagFiltered.filter(casino => casino.recommendedByExperts === true));
  setcertifiedCasinos(tagFiltered.filter(casino => casino.certifiedCasino === true));
};




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
         
          <div className="mt-32 px-4 w-full flex justify-center">
            <div className="w-full max-w-2xl">
              <SearchBox />
            </div>
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
                <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo} onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
/>
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
                 <ExpertCard key={index} logo={casino.logo} name={casino.name} onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                recommendedByExpertss.slice(0, 6).map((casino, index) => (
                 <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo}  onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
 />
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
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    certifiedCasinos.slice(0, 6).map((casino, index) => (
                     <Card2 key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo}  onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
/>
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
                      <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo}  onClick={(isNewTab) => handlePlayClick(casino.name,isNewTab)}
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
              <ul className="space-y-2 text-left text-white">
                {cryptoData.overview.map((item, idx) => (
                  <li
                    key={item.heading}
                    className={`cursor-pointer transition-colors hover:text-[red] ${activeSection === item.heading.replace(/\s+/g, '-').toLowerCase() ? "text-red-500  font-bold" : "text-white"}`}
                    onClick={() => {
                      const el = document.getElementById(item.heading.replace(/\s+/g, '-').toLowerCase());
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {item.heading}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        <div className="flex w-full max-w-6xl text-[white] rounded-lg shadow-lg overflow-hidden">
          {/* Main Content */}
          <div className="w-full md:w-3/4 p-8 text-left text-[white]">
            <h1 className="text-3xl font-bold mb-8 text-red-500">{cryptoData.title}</h1>
            {cryptoData.overview.map((item, idx) => (
              <div key={item.heading} className="mb-8">
                <h2 id={item.heading.replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-bold mb-2 text-red-400">
                  {item.heading}
                </h2>
                <p className="text-lg whitespace-pre-line">{item.data}</p>
              </div>
            ))}
          </div>
        </div>
      </section>  
   

      <Footer />
    </>
  );
};

export default Games;