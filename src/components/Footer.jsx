import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <img src="/homeicon.png" alt="Logo" className="h-8 mr-2" />
              Home Academy
            </h3>
            <p className="text-gray-400 mb-4">
              Premier English language center providing quality education since 1999. 
              We help students achieve fluency and confidence in English communication.
            </p>
           
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Abdullah Apartment, New Kumharwara, Near Spicy Corner, Lyari, Karachi</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-gray-400 mr-3" />
                <a href="tel:+923323769179" className="text-gray-400 hover:text-white transition">
                  0332-3769179 / 0332-2449008
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-gray-400 mr-3" />
                <a href="mailto:homeacademy.lyari@gmail.com" className="text-gray-400 hover:text-white transition">
                  homeacademy.lyari@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new courses and offers</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} Home Academy. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
