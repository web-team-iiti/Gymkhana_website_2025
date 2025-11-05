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
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full bg-black text-gray-400">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-700 pb-8">
        {/* Left Section */}
        <div className="md:max-w-lg">
          <div className="flex items-center space-x-3">
            <img
              src="/main_logo.png"
              className="h-10 sm:h-20 md:h-30"
              alt="Logo"
            />
            <h2 className="text-white pt-2 text-xl md:text-2xl font-bold">
              Student's Gymkhana IIT Indore
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col md:flex-row md:justify-end gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-semibold text-xl mb-5 text-white">Contact</h2>
            <ul className="text-sm font-semibold text-white space-y-2">
              {/* Email */}
              <li className="flex items-center space-x-2">
                <MdEmail className="text-white" />
                <a
                  href="mailto:studentgym@iiti.ac.in"
                  className="hover:text-blue-400 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  studentgym@iiti.ac.in
                </a>
              </li>

              {/* Location */}
              <li className="flex items-start space-x-2">
                <MdLocationOn className="text-white mt-1" />
                <a
                  href="https://www.google.com/maps/place/Indian+Institute+of+Technology+Indore/@22.5203748,75.9201363,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  Indian Institute of Technology Indore,
                  <br />
                  Khandwa Road, Simrol,
                  <br />
                  Indore 453552
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="font-semibold text-xl mb-5 text-white">Follow Us</h2>
            <div className="flex space-x-4 text-lg">
              <a
                href="https://www.facebook.com/iitindore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/iitindore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/school/iit-indore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com/IITIOfficial"
                target="_blank"
                rel="noopener noreferrer"
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
