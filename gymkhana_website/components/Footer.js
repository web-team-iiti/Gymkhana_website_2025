import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full bg-gray-900 text-gray-400">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-700 pb-8">
        {/* Left Section */}
        <div className="md:max-w-md">
          <div className="flex items-center space-x-3">
            <img
              src="/main_logo.png"
              className="h-10 sm:h-20 md:h-40 lg:h-48"
              alt="Logo"
            />
          </div>
            <h2 className="text-white pt-2 text-xl md:text-2xl font-bold">
              Student's Gymkhana IIT Indore
            </h2>
          <p className="mt-6 text-sm font-semibold leading-relaxed text-gray-300">
            Student Gymkhana, IIT Indore represents the collective student body,
            organizing various cultural, technical, and sports activities
            throughout the year to enhance student engagement and leadership.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col md:flex-row md:justify-end gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-semibold text-xl mb-5 text-white">Contact</h2>
            <ul className="text-sm font-semibold text-white space-y-2">
              <li className="flex items-center space-x-2">
                <MdEmail className="text-white" />
                <span>studentgym@iiti.ac.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdLocationOn className="text-white" />
                <span>
                  Indian Institute of Technology Indore,<br />
                  Khandwa Road, Simrol,<br />
                  Indore 453552
                </span>
              </li>
            </ul>
          </div>


          {/* Social Media */}
          <div>
            <h2 className="font-semibold text-xl mb-5 text-white">Follow Us</h2>
            <div className="flex space-x-4 text-lg">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sky-400 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <p className="pt-6 text-center text-xs md:text-sm pb-6 border-t border-gray-800 mt-6 text-gray-500">
        © {new Date().getFullYear()} Student's Gymkhana, IIT Indore. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
