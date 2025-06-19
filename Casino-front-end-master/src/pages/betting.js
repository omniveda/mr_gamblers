import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBox from "../components/searchbox";
import Card from "../components/Card";
import ExpertCard from "../components/ExpertCard";
import Footer from "../components/Footer";

import bettingBg from "../assets/images/betting-bg.png";
import certified from "../assets/images/Certified.png";
import leftCircle from "../assets/images/lefteclipse.png";
import rightCircle from "../assets/images/righteclipse.png";

const BETTING_TYPE_TAGS = {
    sports: "Sports Betting",
    "new-sites": "New Betting Sites",
    types: "Bet Types",
    bonuses: "Betting Bonuses",
    "free-bets": "Free Bets",
};

const Betting = ({ type }) => {
    const [bettingData, setBettingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [hot, setHot] = useState([]);
    const [expert, setExpert] = useState([]);
    const [certifiedData, setCertifiedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#1e1e1e";
        return () => {
            document.body.style.backgroundColor = null;
        };
    }, []);

    useEffect(() => {
        const fetchBettingSites = async () => {
            setLoading(true);
            try {
                const response = await API.get("/casinos");
                const data = response.data;
                setBettingData(data);
                filterDataByType(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBettingSites();
    }, [type]);
 const handlePlayClick = (name) => {
    navigate(`/casinos/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };
    const filterDataByType = (data) => {
        const tag = BETTING_TYPE_TAGS[type];
        const filtered = data.filter(
            (item) => Array.isArray(item.tags) && item.tags.includes(tag)
        );
        setFilteredData(filtered);
        setHot(filtered.filter((item) => item.hotCasino));
        setExpert(filtered.filter((item) => item.recommendedByExperts));
        setCertifiedData(filtered.filter((item) => item.certifiedCasino));
    };

    return (
        <>
            <Navbar />

            <header
                className="relative bg-cover bg-center h-[60vh] min-h-[400px] md:h-screen"
                style={{ backgroundImage: `url(${bettingBg})` }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                    <div className="text-center mt-32 w-full max-w-2xl">
                        <SearchBox />
                    </div>
                </div>
            </header>

            <section className="py-10 bg-black100 text-center">
                <h2 className="text-3xl text-white font-semibold mb-6">Top Betting Sites</h2>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 m-10 mt-0">
                        {loading ? (
                            <p className="text-white">Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            filteredData.slice(0, 5).map((item, index) => (
                                <Card key={index} name={item.name} rating={item.rating} bgImage={item.logo} onClick={() => handlePlayClick(item.name)} />
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
                />
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-6xl">HOT BETTING SITES</h2>
                    <div className="flex justify-center mb-10 rounded-2xl mx-auto max-w-[900px] p-10 bg-green-800">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                            {hot.slice(0, 4).map((item, index) => (

                                <ExpertCard key={index} bgImage={item.logo} name={item.name} onClick={() => handlePlayClick(item.name)} />
                            ))}
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-10 mt-40 text-2xl md:text-3xl lg:text-4xl">RECOMMENDED BY EXPERTS</h2>
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {expert.slice(0, 6).map((item, index) => (
                                <ExpertCard key={index} logo={item.logo} name={item.name} onClick={() => handlePlayClick(item.name)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-black100 text-center">
                <div className="flex flex-col items-center">
                    <div className="relative text-white p-10 w-full" style={{ background: "linear-gradient(to right, #1A008E, #070028)" }}>
                        <div className="flex flex-row justify-center items-center text-center mb-10">
                            <img src={certified} alt="Certified" className="w-12 h-12 sm:w-24 sm:h-24 sm:mr-4 mb-4 sm:mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl">Certified Betting Sites</h2>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                                {certifiedData.slice(0, 6).map((item, index) => (
                                    <ExpertCard key={index} logo={item.logo} name={item.name} onClick={() => handlePlayClick(item.name)}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-black100 text-center">
                <div className="flex flex-col items-center">
                    <div className="relative text-white bg-black100 p-10 w-full max-w-full">
                        <h2 className="text-3xl font-bold text-white mb-6 text-2xl md:text-4xl lg:text-5xl">Recently Added </h2>
                        <div className="flex justify-center items-center">
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                                {filteredData.slice(0, 6).map((casino, index) => (
                                    <Card key={index} name={casino.name} rating={casino.rating} bgImage={casino.logo}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Betting;
