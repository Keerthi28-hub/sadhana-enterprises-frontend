import { useState } from "react";
import logo from "../assets/logo.jpeg";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputLib.default || PhoneInputLib;

function RequirementModal({ requirement, onClose }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let err = {};

    if (!phone || phone.length < 10) err.phone = true;
    if (!name.trim()) err.name = true;

    setErrors(err);
    if (Object.keys(err).length > 0) return;

    console.log({ requirement, phone, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white w-[800px] rounded-lg shadow-lg flex relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        {/* LEFT */}
        <div className="w-1/2 border-r p-4 text-center">
          <img src={logo} className="w-40 mx-auto" />
          <p className="mt-3 font-semibold">Sadhana Enterprises</p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-6">

          <h2 className="text-lg font-bold mb-3">
            Share your requirement
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            {requirement}
          </p>

          {/* PHONE */}
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(val) => {
              setPhone(val);
              setErrors((p) => ({ ...p, phone: false }));
            }}
            inputStyle={{
              width: "100%",
              borderColor: errors.phone ? "red" : "#ccc",
            }}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              Enter valid number
            </p>
          )}

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: false }));
            }}
            className={`w-full mt-3 p-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              Enter your name
            </p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded"
          >
            Submit Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default RequirementModal;