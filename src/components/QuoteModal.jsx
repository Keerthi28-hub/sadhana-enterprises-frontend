import { useState } from "react";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// FIX for Vite import issue
const PhoneInput = PhoneInputLib.default || PhoneInputLib;

function QuoteModal({ product, type, onClose }) {

  const [phone, setPhone] = useState("");

  // ✅ SUCCESS + ERROR
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isPrice = type === "price";

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    setSuccess("");
    setError("");

    // ✅ Validation
    if (!phone || phone.length < 10) {
      setError("Enter valid mobile number");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/quotes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: product.name,
            type,
            phone,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        // ✅ SUCCESS MESSAGE
        setSuccess("Request submitted successfully ✅");

        // ✅ CLEAR PHONE
        setPhone("");

        // ✅ AUTO CLOSE
        setTimeout(() => {
          setSuccess("");
          onClose();
        }, 1500);

      } else {
        setError("Failed to submit");
      }

    } catch (err) {
      console.log(err);

      setError("Server error");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-3"
      onClick={onClose}
    >

      {/* MAIN CONTAINER */}
      <div
        className="bg-white w-full max-w-[850px] rounded-lg shadow-lg flex flex-col md:flex-row relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl z-10"
        >
          ✕
        </button>

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 border-r p-4">

          {/* PRODUCT IMAGE */}
          <img
            src={
              product.images?.[0] ||
              product.image ||
              "https://via.placeholder.com/500x300?text=No+Image"
            }
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x300?text=Image+Not+Found";
            }}
            className="w-full h-48 md:h-64 object-cover rounded"
          />

          {/* PRODUCT NAME */}
          <h3 className="mt-3 font-semibold text-lg">
            {product.name}
          </h3>

          {/* PRODUCT PRICE */}
          <p className="text-sm text-gray-600 mt-1">
            {product.price}
          </p>

          {/* SELLER */}
          <p className="text-xs text-gray-500 mt-2">
            Sold By - Sadhana Enterprises
          </p>

          {/* PRODUCT DETAILS */}
          <div className="text-xs text-gray-600 mt-2 space-y-1">

            {Array.isArray(product.details) &&
              product.details.slice(0, 4).map(([k, v], i) => (
                <p key={i}>
                  {k} - {v}
                </p>
              ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-6">

          <h2 className="text-lg font-bold mb-2">
            {isPrice ? "Get Best Price" : "Get Best Quote"}
          </h2>

          <p className="text-sm text-gray-600 mb-4">
            Get details from{" "}
            <b>Sadhana Enterprises</b>{" "}
            on your mobile quickly
          </p>

          {/* LABEL */}
          <label className="text-sm font-medium">
            Mobile Number
          </label>

          {/* PHONE INPUT */}
          <div className="mt-2">
            <PhoneInput
              country={"in"}
              enableSearch
              value={phone}
              onChange={setPhone}
              inputStyle={{
                width: "100%",
                height: "42px",
                borderRadius: "6px",
              }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            We will contact you on this number
          </p>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            className={`w-full mt-4 py-2 rounded font-semibold text-white transition
              ${
                isPrice
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            Submit Now
          </button>

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 text-sm mt-3">
              {success}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default QuoteModal;