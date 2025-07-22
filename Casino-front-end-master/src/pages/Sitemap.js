import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Sitemap = () => {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Online Casinos', path: '/casinos/crypto' },
        { name: 'Casino Bonuses', path: '/bonuses' },
        { name: 'Casino Games', path: '/games' },
        { name: 'Slots', path: '/slots/new' },
        { name: 'Betting', path: '/betting/sports' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Login', path: '/login' },
      ],
    },
    {
      title: 'Online Casinos',
      links: [
        { name: 'Crypto Casinos', path: '/casinos/crypto' },
        { name: 'Online Casinos', path: '/casinos/online' },
        { name: 'Certified Casinos', path: '/casinos/certified' },
        { name: 'Mobile Casinos', path: '/casinos/mobile' },
        { name: 'Newest Casinos', path: '/casinos/newest' },
      ],
    },
    {
      title: 'Casino Bonuses',
      links: [
        { name: 'Latest Bonuses', path: '/bonuses/latest' },
        { name: 'Exclusive Bonuses', path: '/bonuses/exclusive' },
        { name: 'Welcome Bonuses', path: '/bonuses/welcome' },
        { name: 'No Deposit Bonuses', path: '/bonuses/no-deposit' },
        { name: 'Free Spins Bonuses', path: '/bonuses/free-spins' },
        { name: 'Cashback Bonuses', path: '/bonuses/cashback' },
        { name: 'No Wagering Bonuses', path: '/bonuses/no-wagering' },
      ],
    },
    {
        title: 'Games',
        links: [
            { name: 'Casino Games', path: '/games/casino' },
            { name: 'Table Games', path: '/games/table' },
            { name: 'Card Games', path: '/games/card' },
            { name: 'Dice Games', path: '/games/dice' },
            { name: 'Real Money Slots', path: '/games/real-money-slots' },
            { name: 'Poker', path: '/games/poker' },
            { name: 'Bingo', path: '/games/bingo' },
            { name: 'Lottery', path: '/games/lottery' },
        ]
    },
    {
        title: 'Slots',
        links: [
            { name: 'Video Slots', path: '/slots/video' },
            { name: 'Classic Slots', path: '/slots/classic' },
            { name: 'Progressive Slots', path: '/slots/progressive' },
            { name: 'New Slots', path: '/slots/new' },
        ]
    },
    {
        title: 'Betting',
        links: [
            { name: 'Sports Betting', path: '/betting/sports' },
            { name: 'New Betting Sites', path: '/betting/new-sites' },
            { name: 'Betting Types', path: '/betting/types' },
            { name: 'Betting Bonuses', path: '/betting/bonuses' },
            { name: 'Free Bets', path: '/betting/free-bets' },
        ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms and Conditions', path: '/terms-and-conditions' },
        { name: 'Cookies Policy', path: '/cookies-policy' },
        { name: 'Responsible Gambling', path: '/responsible-gambling' },
      ],
    },
  ];

  return (
    <div className="bg-black100 px-[10px] text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Mr Gamblers Sitemap</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-semibold mb-4 text-red-400">{section.title}</h2>
              <ul>
                {section.links.map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link to={link.path} className="hover:text-red-400 transition-colors duration-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap; 