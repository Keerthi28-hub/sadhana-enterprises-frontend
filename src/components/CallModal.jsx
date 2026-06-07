import { useState } from "react";
import logo from "../assets/logo.jpeg";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputLib.default || PhoneInputLib;

function CallModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= CLOSE MODAL ================= */

  const handleClose = () => {
    setPhone("");
    setError("");
    setSuccess("");

    onClose();
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // ✅ Validation
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setError("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      // ✅ Clean number
      const cleanedPhone = phone.replace(/\D/g, "");

      const res = await fetch("http://localhost:5000/save-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanedPhone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Request sent successfully ✅");

        // ✅ Clear input
        setPhone("");

        // ✅ Auto close
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 1500);

      } else {
        setError(data.message || "Failed to submit");
      }

    } catch (err) {
      console.log(err);

      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MODAL CHECK ================= */

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-3"
      onClick={handleClose}
    >

      {/* MAIN MODAL */}
      <div
        className="bg-white w-full max-w-[900px] rounded-xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-2xl font-light text-gray-500 hover:text-black z-10"
        >
          ✕
        </button>

        {/* LEFT SIDE */}
        <div className="w-full md:w-[35%] bg-gray-100 flex flex-col items-center justify-center px-6 py-8 border-b md:border-b-0 md:border-r">

          <div className="bg-white p-5 rounded-lg shadow-md">
            <img
              src={logo}
              alt="logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>

          <p className="mt-4 text-sm md:text-base text-gray-700 font-medium text-center">
            Sadhana Enterprises
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[65%] px-5 py-8 md:px-10 md:py-10 flex flex-col justify-center">

          <h2 className="text-lg md:text-2xl font-semibold leading-snug mb-3">
            Connect with{" "}
            <span className="font-bold text-green-700">
              Sadhana Enterprises
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-500 mb-5">
            Enter your mobile number and our team will contact you shortly.
          </p>

          {/* LABEL */}
          <label className="text-sm font-medium mb-2">
            Mobile Number
          </label>

          {/* PHONE INPUT */}
          <div className="mb-3">
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(value) => setPhone(value)}
              inputStyle={{
                width: "100%",
                height: "50px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
              containerStyle={{
                width: "100%",
              }}
            />
          </div>

          <p className="text-xs md:text-sm text-gray-500 mb-5">
            We will contact you on this number
          </p>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`h-12 px-6 rounded-md text-sm md:text-base font-medium text-white transition-all duration-300 w-full md:w-[180px]
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 mt-4 text-sm font-medium">
              {success}
            </p>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 mt-4 text-sm font-medium">
              {error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default CallModal;