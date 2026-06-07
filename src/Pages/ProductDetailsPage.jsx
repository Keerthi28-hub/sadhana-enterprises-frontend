import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import productsData from "../data/productsData";
import Sidebar from "../components/Sidebar";
import QuoteModal from "../components/QuoteModal";

import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputLib.default || PhoneInputLib;

function ProductDetailsPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const productList = productsData[name];

  const [activeImages, setActiveImages] = useState({});
  const [phone, setPhone] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);

  // ✅ FORM STATES
  const [requirement, setRequirement] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [errors, setErrors] = useState({});

  if (!productList) {
    return <div className="text-green-700 p-10">Product not found</div>;
  }

  const handleImage = (index, img) => {
    setActiveImages((prev) => ({
      ...prev,
      [index]: img,
    }));
  };

  // ✅ VALIDATION
  const handleContact = async () => {
  let newErrors = {};

  if (!requirement.trim()) newErrors.requirement = true;
  if (!phone || phone.length < 10) newErrors.phone = true;
  if (!nameInput.trim()) newErrors.name = true;

  setErrors(newErrors);

  // ✅ Stop if errors
  if (Object.keys(newErrors).length > 0) {
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:5000/quick-contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirement,
          phone,
          name: nameInput,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
      alert("Request submitted successfully ✅");

      // ✅ Clear form
      setRequirement("");
      setPhone("");
      setNameInput("");

    } else {
      alert("Failed to submit");
    }

  } catch (err) {
    console.log(err);

    alert("Server error");
  }
};

  return (
    <div className="bg-green-50 min-h-screen px-6 py-6">

      {/* BREADCRUMB */}
      <p className="text-green-700 text-sm mb-4">
  <span
    onClick={() => navigate("/")}
    className="cursor-pointer hover:underline"
  >
    Home
  </span>
  {" » Products » "}
  <span className="font-semibold capitalize">
    {name.replace(/-/g, " ")}
  </span>
</p>

      <div className="grid md:grid-cols-4 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-1 space-y-4 sticky top-5 h-fit">

          <Sidebar />

          {/* CONTACT BOX */}
          <div className="bg-white p-4 rounded shadow border">

            <h3 className="bg-blue-500 text-white px-3 py-2 font-semibold rounded">
              Contact Us Quickly
            </h3>

            {/* REQUIREMENT */}
            <textarea
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="Describe your requirement..."
              className={`w-full p-2 mt-3 text-sm rounded border ${
                errors.requirement ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.requirement && (
              <p className="text-red-500 text-xs mt-1">
                Please enter requirement
              </p>
            )}

            {/* PHONE */}
            <div className="mt-3">
              <PhoneInput
                country={"in"}
                enableSearch
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  borderColor: errors.phone ? "red" : "#ccc",
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  Enter valid mobile number
                </p>
              )}
            </div>

            {/* NAME */}
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              className={`w-full p-2 mt-3 text-sm rounded border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                Enter your name
              </p>
            )}

            {/* BUTTON */}
            <button
              onClick={handleContact}
              className="bg-green-600 text-white w-full mt-3 py-2 rounded hover:bg-green-700"
            >
              Contact Now
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-3 space-y-8">

          {productList.map((product, index) => {
            const currentImage =
              activeImages[index] ||
              (Array.isArray(product.images) ? product.images[0] : "");

            return (
              <div
                key={index}
                className="bg-white p-5 rounded shadow border"
              >

                <h2 className="text-xl font-bold text-green-700">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  📍 {product.location}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-500">Approx.</span>

                  <span className="text-lg font-semibold text-green-700">
                    {product.price}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setModalType("price");
                    }}
                    className="bg-yellow-400 text-black text-xs px-3 py-1 rounded"
                  >
                    Get Latest Price
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* DETAILS */}
                  <div className="text-sm">
                    {Array.isArray(product.details) &&
                      product.details.map(([key, value], i) => (
                        <div
                          key={i}
                          className="flex justify-between border-b py-2"
                        >
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                  </div>

                  {/* IMAGE */}
                  <div>
                    <img
                      src={currentImage}
                      className="w-full h-64 object-cover rounded"
                    />

                    <div className="flex gap-2 mt-3">
                      {Array.isArray(product.images) &&
                        product.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            onClick={() => handleImage(index, img)}
                            className={`w-16 h-16 cursor-pointer border ${
                              currentImage === img
                                ? "border-green-600"
                                : "border-gray-200"
                            }`}
                          />
                        ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setModalType("quote");
                      }}
                      className="mt-4 w-full bg-green-600 text-white py-2 rounded"
                    >
                      Get Best Quote
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {product.description}
                </p>

              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {modalType && selectedProduct && (
        <QuoteModal
          product={selectedProduct}
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}

    </div>
  );
}

export default ProductDetailsPage;