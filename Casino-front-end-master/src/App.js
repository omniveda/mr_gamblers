import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { trackPageView } from "./utils/analytics";

const Home = lazy(() => import("./pages/Home"));
const Casinos = lazy(() => import("./pages/casinos"));
const Bonuses = lazy(() => import("./pages/Bonuses"));
const Games = lazy(() => import("./pages/Games"));
const Slots = lazy(() => import("./pages/slots"));
const Betting = lazy(() => import("./pages/betting"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CasinosAdmin = lazy(() => import("./pages/CasinosAdmin"));
const BlogsAdmin = lazy(() => import("./pages/BlogsAdmin"));
const SettingsAdmin = lazy(() => import("./pages/SettingsAdmin"));
const CreateCasino = lazy(() => import("./pages/CreateCasino"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const EditCasino = lazy(() => import("./pages/EditCasino"));
const EditBlog = lazy(() => import("./pages/EditBlog"));
const CasinoDetail = lazy(() => import("./pages/CasinoDetail"));
const Login = lazy(() => import("./pages/Login"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndCondition"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicies"));
const ResponsibleGambling = lazy(() => import("./pages/ResponsibleGambling"));
const Sitemap = lazy(() => import("./pages/Sitemap"));

function App() {
  const location = useLocation();

  useEffect(() => {
    // Track initial pageview
    trackPageView(location.pathname);

    // Cleanup function
    return () => {
      // Add any cleanup logic here if needed
    };
  }, [location.pathname]);

  return (
    <Suspense fallback={<div className="w-full h-screen bg-[#1e1e1e] flex justify-center items-center text-white text-2xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casinos" element={<Casinos />} />
        <Route path="/bonuses" element={<Bonuses />} />
        <Route path="/games" element={<Games />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/betting" element={<Betting />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/casinos-admin" element={<CasinosAdmin />} />
        <Route path="/blogs-admin" element={<BlogsAdmin />} />
        <Route path="/settings-admin" element={<SettingsAdmin />} />
        <Route path="/create-casino" element={<CreateCasino />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-casino/:id" element={<EditCasino />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/casino" element={<CasinoDetail />} />
        <Route path="/casinos/:slug" element={<CasinoDetail />} />

        {/* Filtered Casinos */}
        <Route path="/casinos/crypto" element={<Casinos type="crypto" />} />
        <Route path="/casinos/online" element={<Casinos type="online" />} />
        <Route path="/casinos/certified" element={<Casinos type="certified" />} />
        <Route path="/casinos/mobile" element={<Casinos type="mobile" />} />
        <Route path="/casinos/newest" element={<Casinos type="newest" />} />

        {/* Bonus Types */}
        <Route path="/bonuses/latest" element={<Bonuses type="latest" />} />
        <Route path="/bonuses/exclusive" element={<Bonuses type="exclusive" />} />
        <Route path="/bonuses/welcome" element={<Bonuses type="welcome" />} />
        <Route
          path="/bonuses/no-deposit"
          element={<Bonuses type="deposit" />}
        />
        <Route
          path="/bonuses/free-spins"
          element={<Bonuses type="spins" />}
        />
        <Route path="/bonuses/cashback" element={<Bonuses type="cashback" />} />
        <Route
          path="/bonuses/no-wagering"
          element={<Bonuses type="wagering" />}
        />

        {/* Games Types */}
        <Route path="/games/casino" element={<Games type="casino" />} />
        <Route path="/games/table" element={<Games type="table" />} />
        <Route path="/games/card" element={<Games type="card" />} />
        <Route path="/games/dice" element={<Games type="dice" />} />
        <Route
          path="/games/real-money-slots"
          element={<Games type="Real Money Online Slots" />}
        />
        <Route path="/games/poker" element={<Games type="poker" />} />
        <Route path="/games/bingo" element={<Games type="bingo" />} />
        <Route path="/games/lottery" element={<Games type="lottery" />} />
        {/* Slots Types */}
        <Route path="/slots/video" element={<Slots type="video" />} />
        <Route path="/slots/classic" element={<Slots type="classic" />} />
        <Route
          path="/slots/progressive"
          element={<Slots type="progressive" />}
        />
        <Route path="/slots/new" element={<Slots type="new" />} />

        {/* Betting Routes */}
        <Route path="/betting/sports" element={<Betting type="sports" />} />
        <Route
          path="/betting/new-sites"
          element={<Betting type="types" />}
        />
        <Route path="/betting/types" element={<Betting type="types" />} />
        <Route path="/betting/bonuses" element={<Betting type="bonuses" />} />
        <Route path="/betting/free-bets" element={<Betting type="bonuses" />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route
          path="/responsible-gambling"
          element={<ResponsibleGambling />}
        />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </Suspense>
  );
}

export default App;
