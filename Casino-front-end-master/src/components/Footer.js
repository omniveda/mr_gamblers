import React from 'react';
import footerbg from '../assets/images/footer-bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTelegram, faWhatsapp, faMicrosoft, faTeamspeak } from "@fortawesome/free-brands-svg-icons";
import logo from '../assets/images/mr_logo.png';
import teamsfav from '../assets/icon/teams-fav.png';

import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-cover bg-center py-10 text-white" style={{ backgroundImage: `url(${footerbg})` }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 mb-5 gap-12">

        {/* Left Column: Newsletter */}
        <div >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-10 text-white max-w-full">
            MR GAMBLERS
          </h2>
          <p className="mt-2 text-lg font-semibold">SUBSCRIBE TO OUR NEWS LETTER</p>
          <form className="mt-6 space-y-4 max-w-lg">
            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <input
                type="email"
                placeholder="Email ID"
                className="flex-1 bg-white bg-opacity-20 py-3 px-4 rounded-md text-white placeholder-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-6 rounded-md font-bold whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </div>

            <div className="space-y-2 text-sm text-white" >
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 accent-red-600" />
                <span>I confirm I am over 18–24 years old, depending on my location.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 accent-red-600" />
                <span>I agree that my contact data may be used to keep me informed about casino and sports betting products, services, and offerings.</span>
              </label>
            </div>
          </form>
        </div>

        {/* Right Column: Links, Countries, Contact */}
        <div className="flex flex-col md:flex-row gap-8 mt-10 mb-5 md:gap-12 lg:gap-16">
          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              <li><a href="/casinos/crypto" className="hover:text-gray-300">Casino</a></li>
              <li><a href="/bonuses/latest" className="hover:text-gray-300">Bonus</a></li>
              <li><a href="/games/casino" className="hover:text-gray-300">Games</a></li>
              <li><a href="/betting/sports" className="hover:text-gray-300">Betting</a></li>
              <li><a href="/slots/video" className="hover:text-gray-300">Slots</a></li>
              <li><a href='/sitemap' >Sitemap</a></li>
            </ul>
          </div>

          {/* Countries */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/cookies-policy" className="hover:underline">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/responsible-gambling" className="hover:underline">Responsible Gambling</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="flex-1">
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} /> support@mrgamblers.com
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FontAwesomeIcon icon={faPhone} /> +44 7537 105417
              </p>
            </div>

            <div className="flex space-x-6 text-2xl mb-6">
              <a href="https://t.me/mrgamblers1983" className="hover:opacity-80"><FontAwesomeIcon icon={faTelegram} /></a>
              <a href="https://teams.live.com/l/invite/FEAmyI2hoQYBndOKwM" className=" hover:opacity-80">
                <img 
                  src={teamsfav} 
                  alt="Microsoft Teams" 
                  className="w-8 h-8" 
                  style={{ filter: 'brightness(0) invert(1)' }} 
                />
              </a>
              <a href="https://wa.me/message/3X4XZMYD4ZPVI1" className="hover:opacity-80"><FontAwesomeIcon icon={faWhatsapp} /></a>
            </div>

            {/* <div className="space-y-1">
              <a href="#" className="block text-sm hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="block text-sm hover:text-gray-300">Terms & Conditions</a>
            </div> */}
          </div>
        </div>

      </div>
      <div className='w-full flex justify-center'>
        <div className='border-t border-white w-[1100px] mx-auto'></div>
      </div>
      <div className='flex justify-center text-white text-sm py-5'>
  <div className="flex items-center space-x-6">
    <div>
      © 2025 Mr Gamblers All rights reserved. Gambling can be addictive
    </div>
    <div className="border-l border-white h-5 mx-4"></div>
    <div>
      Powered By CyBite
    </div>  
  </div>
</div>
    </footer>
  );
};

export default Footer;
