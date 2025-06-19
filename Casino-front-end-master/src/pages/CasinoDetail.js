
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getCasinoById, getCasinoBySlug } from "../api/casinos";
import ColorThief from "colorthief";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bonusesBg from "../assets/images/casino-bg.png";
import crown from "../assets/images/crown.png";

const CasinoDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [casino, setCasino] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState("#1D1235");
  const [activeTab, setActiveTab] = useState("general");
  const imgRef = useRef(null);

  useEffect(() => {
    const fetchCasino = async () => {
      try {
        const casinoId = location.state?.casinoId;
        let data;

        if (casinoId) {
          data = await getCasinoById(casinoId);
        } else {
          data = await getCasinoBySlug(slug);
          if (!data) throw new Error("Casino not found");
        }

        setCasino(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCasino();
  }, [slug, location.state]);

  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    if (!casino?.logo) return;

    const img = imgRef.current;
    const colorThief = new ColorThief();

    const extractColor = () => {
      try {
        const color = colorThief.getColor(img);
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (e) {
        console.error("ColorThief error:", e);
        setBgColor("#1D1235"); // Fallback color
      }
    };

    if (img && img.complete) {
      extractColor();
    } else if (img) {
      img.addEventListener("load", extractColor);
      return () => img.removeEventListener("load", extractColor);
    }
  }, [casino]);

  // SafeJoin utility
  const safeJoin = (value, fallback = "") => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value;
    return fallback;
  };

  const renderTabContent = () => {
    if (!casino) return null;

    const safeJoin = (value, fallback = "") => {
      if (Array.isArray(value)) return value.join(", ");
      if (value) return value;
      return fallback;
    };

    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4 text-sm text-gray-100 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-4">
              <div>
                <p className="text-xl font-noodle inline text-white">
                  Website:{" "}
                </p>
                <a
                  href={casino.editorView || "#"}
                  className="text-blue-400 underline text-lg break-all ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {casino.generalInfo?.website || "Not available"}
                </a>
              </div>
              {/* <div>
                <p className="text-xl font-noodle inline text-white">
                  Affiliate Program:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {casino.generalInfo?.affiliateProgram
                    ? "Available"
                    : "Not available"}
                </span>
              </div> */}
              <div>
                <p className="text-xl font-noodle inline text-white">
                  Languages:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {safeJoin(casino.generalInfo?.languages, "English")}
                </span>
              </div>
              <div>
                <p className="text-xl font-noodle inline text-white">
                  Company:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {casino.generalInfo?.companyName || "Not specified"}
                </span>
              </div>
              {/* <div>
                <p className="text-xl font-noodle inline text-white">
                  Casino Type:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {safeJoin(casino.generalInfo?.casinoType, "Online Casino")}
                </span>
              </div> */}
              
              <div>
                <p className="text-xl font-noodle inline text-white">
                  Established:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {casino.generalInfo?.established || "Not specified"}
                </span>
              </div>
              <div>
                <p className="text-xl font-noodle inline text-white">
                  License:{" "}
                </p>
                <span className="ml-1 text-lg">
                  {safeJoin(casino.generalInfo?.licences, "Not specified")}
                </span>
              </div>
              {/* <div>
                <p className="text-xl font-noodle inline text-white">
                  Editor View:{" "}
                </p>
                <span className="ml-1">
                  {casino.editorView || "Not specified"}
                </span>
              </div> */}
              <div>
                <p className="text-xl font-noodle inline text-white">
                  Support:
                </p>
                <span className="ml-1 text-lg">
                  {casino.responsibleGaming?.support || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-4 text-sm text-gray-100 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-4">
              <div>
                <p className="text-xl text-white font-semibold inline">
                  Minimum Deposit:{" "}
                </p>
                <span className="text-lg text-gray-300 inline">
                  {casino.paymentInfo?.minimumDeposit || "0"}
                </span>
              </div>
              <div>
                <p className="text-xl text-white font-semibold inline">
                  Deposit Methods:{" "}
                </p>
                <span className="text-lg text-gray-300 inline">
                  {safeJoin(
                    casino.paymentInfo?.withdrawalMethods,
                    "Various methods available"
                  )}
                </span>
              </div>
              <div>
                <p className="text-xl text-white font-semibold inline">
                  Withdrawal Time:{" "}
                </p>
                <span className="text-lg text-gray-300 inline">
                  {casino.paymentInfo?.withdrawalTime || "Not specified"}
                </span>
              </div>
              <div>
                <p className="text-xl text-white font-semibold inline">
                  Currencies:{" "}
                </p>
                <span className="text-lg text-gray-300 inline">
                  {casino.paymentInfo?.fees || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        );

      case "games":
        return (
  <div className="flex flex-col items-center justify-center mt-4">
    <div className="text-sm text-gray-100 w-full max-w-md">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-full text-center">
          <p className="text-lg font-medium text-white">
            {
              Array.isArray(casino.generalInfo?.casinoType)
                ? casino.generalInfo.casinoType.map((item, index) => (
                    <span key={index}>{item}<br /></span>
                  ))
                : null 
            }
          </p>
        </div>
      </div>
    </div>
  </div>
);

      case "responsible":
        return (
          <div className="space-y-4 text-sm text-gray-100 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 gap-4">
              <div>
                <p className="text-xl font-noodle inline text-white">Games:</p>
                <span className="ml-1 text-lg">
                  {safeJoin(casino.responsibleGaming?.tools, "Not specified")}
                </span>
              </div>
              
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-white text-xl">Loading casino details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!casino) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-white text-xl">Casino not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#181818]">
        <header
          className="relative bg-cover bg-center"
          style={{ backgroundImage: `url(${bonusesBg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          {casino && (
            <div className="relative z-10 pt-24 pb-8 px-4 sm:px-6 md:px-20">
              <div className="relative w-full max-w-6xl mx-auto flex justify-center">

                {/* Crown */}
                <div
                  className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-white z-20 flex items-center justify-center"
                  style={{ boxShadow: "inset 0 0 0 3px red" }}
                >
                  <img
                    src={crown}
                    alt="Crown"
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full border border-blue-200 relative z-10">
                  {/* Logo */}
                  <div
                    className="flex items-center justify-center p-6 md:w-1/3"
                    style={{ backgroundColor: bgColor }}
                  >
                    {casino.logo ? (
                      <img
                        ref={imgRef}
                        src={casino.logo}
                        alt={casino.name || "Casino"}
                        className="max-h-24 sm:max-h-48 object-contain"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    ) : (
                      <div className="text-white text-lg">
                        No logo available
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-6 md:p-8 pt-10 text-left md:w-2/3">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-widest text-center md:text-left">
                     
                    </p>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                        {casino.name || "Casino Name"}
                      </h2>
                      <div className="flex items-center justify-center sm:justify-start space-x-2">
                        <span className="text-red-500 text-lg font-bold">
                          {(casino.rating || 4.6).toFixed(1)}
                        </span>
                        <span className="text-red-500 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(casino.rating || 4.6) ? "★" : "☆"}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>

                    {/* Bonuses */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                      <div className="flex items-center border border-red-200 rounded-xl px-4 py-3 gap-3 bg-red-50 w-full sm:w-1/2">
                        <span className="text-2xl">💰</span>
                        <div>
                          <p className="text-xs text-gray-500">Deposit Bonus</p>
                          <p className="text-sm font-semibold">
                            {casino.depositBonus ||
                              "Up to 1000 € cash bonus + 25k"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center border border-red-200 rounded-xl px-4 py-3 gap-3 bg-red-50 w-full sm:w-1/2">
                        <span className="text-2xl">🎰</span>
                        <div>
                          <p className="text-xs text-gray-500">Welcome Bonus</p>
                          <p className="text-sm font-semibold">
                            {casino.welcomeBonus || "32 Free Spins"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Overview */}
                    <div className="mt-4 text-sm text-gray-700">
                      <h3 className="font-semibold mb-1">Overview</h3>
                      <p>
                        {casino.overview ||
                          "Experience top-tier online gaming with our featured casino of the month!"}
                      </p>
                    </div>

                    {/* Features & CTA */}
                    <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4">
                      {/* Features Section */}
                      {casino.generalInfo?.features?.length > 0 ? (
                        <div>
                          <h3 className="font-semibold text-sm mb-2">
                            Features
                          </h3>
                          <ul className="text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                            {casino.generalInfo.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                ✅ <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="hidden sm:block" />
                      )}

                      {/* CTA Section */}
                      <div className="relative">
                        <div className="sm:bottom-0 sm:right-0 w-full sm:w-auto">
                          <div className="flex flex-col items-center sm:items-end">
                            <p className="text-sm text-gray-600 text-center whitespace-nowrap mb-2">
                              {casino.visits || 0} Has Already Visited!
                            </p>
                            <a
                              href={casino.editorView || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-full transition duration-200 text-base w-full sm:w-auto text-center"
                            >
                              Play now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
      </div>

      <section className="mt-2">
        <main className="max-w-6xl mx-auto px-8 py-8">
          {/* Tab Buttons */}
          <div className="flex justify-start sm:justify-center pb-4 overflow-x-auto scrollbar-hide space-x-6 sm:space-x-20">
            {["general", "payment", "games", "responsible"].map(
              (tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 text-sm sm:text-lg font-semibold px-6 sm:px-10 py-2 sm:py-4 border border-[#3d3d3d] rounded-[30px] whitespace-nowrap ${activeTab === tab
                      ? "bg-[#00000040] text-white"
                      : "text-white hover:text-red-600"
                    }`}
                >
                  {tab === "general" && "General Info"}
                  {tab === "payment" && "Banking Info"}
                  {tab === "games" && "Deposit Bonuses"}
                  {tab === "responsible" && "Games"}
                </button>
              )
            )}
          </div>

          {/* Tab Content */}
          <div className="mt-6 px-8 lg:px-48">{renderTabContent()}</div>
        </main>
      </section>

      {/* New Rich Text Content Section */}
      <h1 className="text-3xl lg:text-4xl font-bold text-red-500 mt-10 lg:mt-20 text-center">
        Editor's View
      </h1>
      {casino?.content && (
        <section className="bg-[#1e1e1e] py-6">
          <div className="max-w-6xl mx-auto px-4">

            <div
              className="prose prose-invert max-w-none text-gray-100"
              dangerouslySetInnerHTML={{ __html: casino.content }}
            />
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default CasinoDetail;
