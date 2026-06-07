import { useState } from "react";
import { FaUserAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PhoneInputLib.default || PhoneInputLib;

function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    message: "",
    name: "",
  });

  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({}); // ✅ NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error while typing
    setErrors((prev) => ({ ...prev, [e.target.name]: false }));
  };

  const handleSubmit = async () => {
  let newErrors = {};

  if (!form.message.trim()) newErrors.message = true;
  if (!phone || phone.length < 10) newErrors.phone = true;
  if (!form.name.trim()) newErrors.name = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phone,
        message: form.message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess("Your request submitted successfully!");

      setForm({
        message: "",
        name: "",
      });

      setPhone("");
      setErrors({});
    }

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="bg-green-800 min-h-screen px-6 py-6 overflow-visible">

      {/* BREADCRUMB */}
      <p className="text-green-800 text-sm mb-4 font-medium">
  <span
    onClick={() => navigate("/")}
    className="cursor-pointer hover:underline"
  >
    Home
  </span>{" "}
  » Contact Us
</p>

      {/* MAIN */}
      <div className="bg-white rounded shadow-md p-6 grid md:grid-cols-2 gap-8">

        {/* LEFT */}
        <div>
          <h2 className="text-xl font-semibold mb-5">Contact Details</h2>

          <div className="space-y-6 text-sm text-gray-700">

            <div className="flex gap-3">
              <FaUserAlt className="text-gray-500 mt-1" />
              <div>
                <p className="font-semibold">Contact Person:</p>
                <p>Sadhana Enterprises (CEO)</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-gray-500 mt-1" />
              <div>
                <p className="font-semibold">Address:</p>
                <p>Hyderabad, Telangana</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaPhoneAlt />
              <p>7842975959</p>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

          {/* MESSAGE */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your requirement..."
            className={`w-full p-3 rounded mb-2 h-28 text-sm outline-none border ${
              errors.message ? "border-red-500 bg-red-50" : "border-blue-300 bg-blue-50"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mb-2">
              Please enter your requirement
            </p>
          )}

          {/* PHONE */}
          <PhoneInput
            country={"in"}
            enableSearch
            value={phone}
            onChange={(val) => {
              setPhone(val);
              setErrors((prev) => ({ ...prev, phone: false }));
            }}
            inputStyle={{
              width: "100%",
              height: "40px",
              borderColor: errors.phone ? "red" : "#93c5fd",
              backgroundColor: errors.phone ? "#fee2e2" : "#eff6ff",
            }}
            containerClass="mb-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mb-2">
              Enter valid mobile number
            </p>
          )}

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name:"
            className={`w-full px-3 py-2 rounded mb-2 text-sm outline-none border ${
              errors.name ? "border-red-500 bg-red-50" : "border-blue-300 bg-blue-50"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mb-2">
              Enter your name
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800"
          >
            ➜ Contact Now
          </button>

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 mt-3 font-medium">
              {success}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;