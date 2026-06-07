import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer({ openEmailModal, openCallModal }) {
  const navigate = useNavigate();

  return (
    <div className="bg-green-700 text-white mt-0">

      {/* CONTACT BOX */}
      <div className="max-w-6xl mx-auto border border-green-800 p-4">

        

        <div className="flex flex-col md:flex-row justify-between gap-4">

          {/* LEFT DETAILS */}
          <div className="text-sm space-y-1">
            <p className="font-semibold">Sadhana Enterprises</p>
            <p>Pune, Maharashtra, India</p>

            {/* BIG CONTACT BUTTON */}
            <button
              onClick={() => navigate("/contact")}
              className="mt-3 bg-white text-black px-4 py-2 rounded font-semibold hover:bg-white"
            >
              Contact Us
            </button>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col gap-3 items-start md:items-end">

            {/* EMAIL */}
            <button
              onClick={openEmailModal}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              <FaEnvelope /> Contact via Email
            </button>

            {/* SMS / CALL */}
            <button
              onClick={openCallModal}
              className="flex items-center gap-2 bg-green-700 px-4 py-2 rounded hover:bg-green-800"
            >
              <FaPhoneAlt /> Contact via SMS
            </button>

          </div>
        </div>
      </div>

      {/* LINKS */}
      <div className="text-center text-sm mt-4 border-t border-green-800 pt-3 space-x-3">

        <span onClick={() => navigate("/about")} className="cursor-pointer hover:underline">
          About Us
        </span>

        <span>|</span>

        <span onClick={() => navigate("/products")} className="cursor-pointer hover:underline">
          Our Products
        </span>

        <span>|</span>

        <span onClick={() => navigate("/contact")} className="cursor-pointer hover:underline">
          Contact Us
        </span>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-xs mt-3 pb-4">
        © Sadhana Enterprises. All Rights Reserved
      </div>

    </div>
  );
}

export default Footer;