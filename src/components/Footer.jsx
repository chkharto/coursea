import { Rocket } from "lucide-react";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] mt-20 px-44 py-12">
      <div className="grid grid-cols-4 gap-12">
        {/* LEFT - BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center text-white">
              <Link to="/">
                <Rocket className="w-7.5 h-7.5" />
              </Link>
            </div>
            <h2 className="text-[24px] font-medium text-[#130E67]">Bootcamp</h2>
          </div>

          <p className="text-[14px] text-[#130E67] font-medium mb-4">
            Your learning journey starts here! <br />
            Browse courses to get started.
          </p>

          <div className="flex gap-3 text-[#736BEA]">
            <FaFacebookF size={18} />
            <FaTwitter size={18} />
            <FaInstagram size={18} />
            <FaLinkedinIn size={18} />
            <FaYoutube size={18} />
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-[20px] font-semibold text-[#130E67] mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-[18px] text-[#666666]">
            <li className="hover:text-[#4F46E5] cursor-pointer">
              Enrolled Courses
            </li>
            <li className="hover:text-[#4F46E5] cursor-pointer">
              <Link to="/courses">Browse Courses</Link>
            </li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="text-[20px] font-semibold text-[#130E67] mb-4">
            Account
          </h3>
          <ul className="space-y-2 text-[18px] text-[#666666]">
            
            <Link to="/" className="hover:text-[#4F46E5] cursor-pointer">My Profile</Link>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-[20px] font-semibold text-[#130E67] mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-[18px] text-[#666666]">
            <div className="flex items-center gap-2">
              <FaMailBulk size={18} />
              <span>contact@company.com</span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhone size={18} />
              <span>(+995) 555 111 222</span>
            </div>

            <div className="flex items-start gap-2">
              <FaMapMarkerAlt size={18} />
              <span>Aghmashenebeli St.115</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-18.5 flex items-center justify-between text-[18px]">
        <p>Copyright © 2026 Redberry International</p>

        <div className="flex gap-4">
          <span className="text-[#666666]">All Rights Reserved</span>
          <span>|</span>
          <span className="text-[#4F46E5] cursor-pointer">
            Terms and Conditions
          </span>
          <span>|</span>
          <span className="text-[#4F46E5] cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
