import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuIndex, setMobileSubmenuIndex] = useState(null);
  const { currentUser } = useAuth();

  const getActiveClass = (path) =>
    location.pathname === path ? 'text-red-600' : 'hover:text-red-600';

  const menuItems = [ 
    { name: 'Home', path: '/', submenu: [] },
    {
      name: 'Casinos',
      submenu: [
        { name: 'Crypto Casino', path: '/casinos/crypto' },
        { name: 'Newest Casino', path: '/casinos/newest' },
        { name: 'Online Casino', path: '/casinos/online' },
        { name: 'Certified Casino', path: '/casinos/certified' },
        { name: 'Mobile Casino', path: '/casinos/mobile' },
        
      ],
    },
    {
      name: 'Bonuses',
      submenu: [
        { name: 'Latest Bonus', path: '/bonuses/latest' },
        { name: 'Exclusive Bonus', path: '/bonuses/exclusive' },
        { name: 'Welcome Bonus', path: '/bonuses/welcome' },
        { name: 'No Deposit', path: '/bonuses/no-deposit' },
        { name: 'Free Spins Bonus', path: '/bonuses/free-spins' },
        { name: 'Cashback Bonus', path: '/bonuses/cashback' },
        { name: 'No Wagering Bonus', path: '/bonuses/no-wagering' },
      ],
    },
    {
      name: 'Games',
      submenu: [
        { name: 'Casino Games', path: '/games/casino' },
        { name: 'Table Games', path: '/games/table' },
        { name: 'Card Games', path: '/games/card' },
        { name: 'Dice Games', path: '/games/dice' },
        { name: 'Online Slots', path: '/games/real-money-slots' },
        { name: 'Poker', path: '/games/poker' },
        { name: 'Bingo', path: '/games/bingo' },
        { name: 'Lottery Games', path: '/games/lottery' },
      ],
    },
    {
      name: 'Slots',
      submenu: [
        { name: 'Video', path: '/slots/video' },
        { name: 'Classic Slots', path: '/slots/classic' },
        { name: 'Progressive Slots', path: '/slots/progressive' },
        { name: 'New Slots', path: '/slots/new' },
      ],
    },
    {
      name: 'Betting',
      submenu: [
        { name: 'Sports Betting', path: '/betting/sports' },
        { name: 'New Betting Sites', path: '/betting/new-sites' },
        { name: 'Bet Types', path: '/betting/types' },
        { name: 'Betting Bonuses', path: '/betting/bonuses' },
        { name: 'Free Bets', path: '/betting/free-bets' },
      ],
    },
    { name: 'About Us', path: '/about-us', submenu: [] },
  ];

  const handleMouseEnter = (index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMenuIndex(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMenuIndex(null), 200);
    setHoverTimeout(timeout);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    setMobileSubmenuIndex(null);
  };

  const toggleMobileSubmenu = (index) => {
    setMobileSubmenuIndex(mobileSubmenuIndex === index ? null : index);
  };

  return (  
    <nav className="bg-black bg-opacity-80 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
       <div
  className="text-4xl text-red-600 bg-[white] rounded-tr-none rounded-tl-[1rem] rounded-br-[1rem] rounded-bl-none px-2"
  style={{ fontFamily: 'BigNoodleTitling', letterSpacing: '0.1em' }}
>
  MR GAMBLERS
</div>

        {/* Hamburger */}
        <div className="md:hidden text-2xl" onClick={toggleMobileMenu}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Desktop Menu */}
        <div
          className="hidden md:flex space-x-8 text-xl items-center"
          style={{ fontFamily: 'BigNoodleTitling', letterSpacing: '0.08em' }}
        >
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={item.path} className={`block ${getActiveClass(item.path)} px-2  text-xl`}>
                {item.name}
              </Link>

              {item.submenu.length > 0 && (
                <div
                  className={`absolute left-0 top-full pt-2 transition-all duration-300 ease-in-out ${activeMenuIndex === idx ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                  <div className=" bg-black text-white rounded shadow-lg z-50 w-64 border border-gray-700 md:max-h-none md:overflow-visible max-h-60 overflow-y-auto">
                    {item.submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={sub.path}
                        className="block px-6 py-3 hover:bg-red-600 transition duration-200"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Login Button */}
          {!currentUser && (
            <Link
              to="/login"
              className="ml-6 px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 py-2 bg-black space-y-2 text-lg" style={{ fontFamily: 'BigNoodleTitling' }}>
          {menuItems.map((item, idx) => (
            <div key={idx}>
              <div
                onClick={() => item.submenu.length > 0 ? toggleMobileSubmenu(idx) : setMobileOpen(false)}
                className="flex justify-between items-center py-2 border-b border-gray-700 cursor-pointer"
              >
                <Link to={item.path} className={getActiveClass(item.path)}>
                  {item.name}
                </Link>
                {item.submenu.length > 0 && (
                  <span>{mobileSubmenuIndex === idx ? '▲' : '▼'}</span>
                )}
              </div>

              {mobileSubmenuIndex === idx && item.submenu.length > 0 && (
                <div className="ml-4 border-l border-gray-600 max-h-52 overflow-y-auto">
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      to={sub.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 px-2 hover:bg-red-600 transition"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Login Button for Mobile */}
          {!currentUser && (
            <Link
              to="/login"
              className="block w-full text-center mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
