import { useState } from "react";
import logo from "../assets/logo.jpeg";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdVerified, MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import EmailModal from "./EmailModal";

import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputLib.default || PhoneInputLib;

/* 🔥 CALL MODAL */
function CallModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-[950px] h-[380px] rounded-lg shadow-xl relative flex">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="w-[260px] bg-gray-100 flex flex-col items-center justify-center py-6 px-4">
          <div className="bg-white p-4 rounded shadow">
            <img src={logo} alt="logo" className="w-24 h-24" />
          </div>
          <p className="mt-4 text-sm text-gray-700 font-medium text-center">
            Sadhana Enterprises
          </p>
        </div>

        <div className="flex-1 px-8 py-6 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2">
            Connect with <span className="font-bold">Sadhana Enterprises</span>
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Enter your mobile number
          </p>

          <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            inputClass="!w-full !h-11 !text-sm !text-black"
            containerClass="mb-3"
          />

          <button className="bg-green-600 text-white py-2 rounded w-[200px] hover:bg-green-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔥 NAVBAR */
function Navbar() {
  const [openCallModal, setOpenCallModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const productMap = {
    "green chilli": "green-chilli",
    "pomegranates": "pomegranate",
    "ginger": "ginger",
    "garlic": "garlic",
    "lemons": "lemon",
    "elephant yam suran": "elephant-yam",
    "curry leaves": "curry-leaves",
    "dry red chilli": "red-chilli",
    "onions": "onion",
    "drumsticks": "drumsticks",
    "tamarind": "tamarind",
  };

  const handleSearch = () => {
    const key = search.toLowerCase().trim();
    const slug = productMap[key];

    if (slug) {
      navigate(`/product/${slug}`);
      setSearch(""); // clear input
    }
  };

  const products = [
    "Green Chilli",
    "Pomegranates",
    "Ginger",
    "Garlic",
    "Lemons",
    "Elephant Yam Suran",
    "Curry Leaves",
    "Dry Red Chilli",
    "Onions",
    "Drumsticks",
    "Tamarind",
  ];

  return (
    <>
      <div className="bg-green-700 text-white px-3 md:px-10 py-4">

        {/* TOP */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-16 bg-white rounded-full p-2"
            />

            <div>
              <h2 className="text-base md:text-xl font-semibold">
                Sadhana Enterprises
              </h2>

              <div className="flex flex-col md:flex-row md:gap-4 mt-1 text-xs md:text-sm text-green-100">

                <div className="flex items-center gap-2">
                  <div className="bg-white text-green-700 rounded-full p-1.5">
                    <FaMapMarkerAlt size={12} />
                  </div>
                  <span>Hyderabad, Telangana</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white text-green-700 rounded-full p-1.5">
                    <MdVerified size={14} />
                  </div>
                  <span>GST NO: 36AICPM4344H1ZC</span>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col md:flex-row gap-2 md:items-center">

            <button
              onClick={() => setOpenCallModal(true)}
              className="w-full md:w-auto flex items-center gap-3 bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100"
            >
              <FaPhoneAlt size={14} />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-semibold">
                  Call 07842975959
                </span>
                <span className="text-xs text-green-600">
                  94% response rate
                </span>
              </div>
            </button>

            <button
              onClick={() => setOpenEmailModal(true)}
              className="w-full md:w-auto flex items-center gap-2 bg-green-900 px-4 py-2 rounded hover:bg-green-800"
            >
              <MdEmail size={16} />
              <span>Send Email</span>
            </button>

          </div>
        </div>

        {/* SEARCH */}
        <div className="mt-3 flex justify-center md:justify-end">
          <div className="flex border border-white/30 rounded overflow-hidden">

            <input
              type="text"
              placeholder="Search Products/Services"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-3 py-2 text-white bg-transparent outline-none w-full md:w-auto"
            />

            <button
              onClick={handleSearch}
              className="bg-green-900 px-4 hover:bg-green-800"
            >
              Search
            </button>

          </div>
        </div>

        {/* MENU */}
        <div className="bg-green-900 mt-3 rounded">
          <ul className="flex flex-col md:flex-row md:justify-center">

            <li className="px-4 md:px-10 py-2 border-b md:border-r md:border-b-0 border-green-700 hover:bg-green-800 text-center">
              <Link to="/about">About Us</Link>
            </li>

            <li
              className="px-4 md:px-10 py-2 border-b md:border-r md:border-b-0 border-green-700 hover:bg-green-800 text-center relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              Our Products

              {showDropdown && (
                <div className="absolute left-0 top-full bg-green-800 w-56 shadow-lg z-50 border border-green-700">

                  {products.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        navigate(`/product/${productMap[item.toLowerCase()]}`)
                      }
                      className="px-4 py-2 text-sm text-white border-b border-green-700 hover:bg-green-700 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}

                </div>
              )}
            </li>

            <li className="px-10 py-2 hover:bg-green-800">
              <Link to="/contact">Contact Us</Link>
            </li>

          </ul>
        </div>

      </div>

      <CallModal
        isOpen={openCallModal}
        onClose={() => setOpenCallModal(false)}
      />

      <EmailModal
        isOpen={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
      />
    </>
  );
}

export default Navbar;