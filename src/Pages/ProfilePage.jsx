import { FaUserAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  // 🔥 PRODUCT SLUG MAP
  const productMap = {
    "Fresh Green Chilli": "green-chilli",
    "Fresh Pomegranates": "pomegranate",
    "Fresh Ginger": "ginger",
    "Fresh Elephant Yam Suran": "elephant-yam",
    "Fresh Garlic": "garlic",
    "Dry Red Chilli": "red-chilli",
    "Onions": "onion",
    "Drumsticks": "drumsticks",
    "Lemons": "lemon",
    "Curry Leaves": "curry-leaves",
    "Tamarind": "tamarind",
  };

  const products = [
    "Fresh Green Chilli",
    "Fresh Pomegranates",
    "Fresh Ginger",
    "Fresh Elephant Yam Suran",
    "Fresh Garlic",
    "Dry Red Chilli",
    "Onions",
    "Drumsticks",
    "Lemons",
    "Curry Leaves",
    "Tamarind",
  ];

  return (
    <div className="bg-green-800 min-h-screen px-6 py-6">

      {/* 🔹 BREADCRUMB */}
      <p className="text-white text-sm mb-4 font-medium">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:underline"
        >
          Home
        </span>{" "}
        » About Us
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 🔹 LEFT SIDEBAR */}
        <div className="bg-green-800 text-white p-4 rounded">

          <h2 className="bg-green-900 px-3 py-2 font-semibold mb-3">
            Our Products
          </h2>

          <ul className="text-sm space-y-2">
            {products.map((item, i) => (
              <li
                key={i}
                onClick={() => navigate(`/product/${productMap[item]}`)}
                className="border-b border-green-700 pb-1 hover:text-yellow-300 cursor-pointer"
              >
                › {item}
              </li>
            ))}
          </ul>

        </div>

        {/* 🔹 RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-6">

          {/* ABOUT */}
          <div className="bg-green-700 p-6 rounded text-white">
            <h2 className="text-xl font-bold mb-3">About Us</h2>
            <p className="text-sm leading-6">
              Established in 2025, <b>Sadhana Enterprises</b> is a trader,
              wholesaler and exporter of fresh agricultural products like mangoes,
              chillies, grapes and more. We ensure high quality and transparency
              in all business operations.
            </p>
          </div>

          {/* 🔥 COMPANY PROFILE */}
          <div className="bg-green-800 rounded overflow-hidden text-white">
            <div className="bg-green-900 px-4 py-2 font-semibold">
              Company Profile
            </div>

            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Nature of Business","Trader - Wholesaler/Distributor"],
                  ["Additional Business","Export, Retail, Wholesale"],
                  ["Company CEO","M . Satyanarayana"],
                  ["Registered Address","Hyderabad, Telangana, India"],
                  ["Total Employees","Upto 12 People"],
                  ["GST Registration Date","1-12-2025"],
                  ["Legal Status","Proprietorship"],
                  ["Annual Turnover","35 Lakhs"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-green-700 hover:bg-green-700/40">
                    <td className="w-1/3 px-4 py-2 bg-green-700 font-medium">{row[0]}</td>
                    <td className="px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 STATUTORY PROFILE */}
          <div className="bg-green-800 rounded overflow-hidden text-white">
            <div className="bg-green-900 px-4 py-2 font-semibold">
              Statutory Profile
            </div>

            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Import Export Code (IEC)","AICPM43445"],
                  ["Banker","SBI Bank"],
                  ["GST No.","36AICPM4344H1ZC"],
                  ["UDYAM No.","UDYAM-TS-20-0163363"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-green-700 hover:bg-green-700/40">
                    <td className="w-1/3 px-4 py-2 bg-green-700 font-medium">{row[0]}</td>
                    <td className="px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 PACKAGING & SHIPMENT */}
          <div className="bg-green-800 rounded overflow-hidden text-white">
            <div className="bg-green-900 px-4 py-2 font-semibold">
              Packaging / Payment & Shipment
            </div>

            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Payment Mode","Cash, Online"],
                  ["Shipment Mode","By Road / By Water / By Air"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-green-700 hover:bg-green-700/40">
                    <td className="w-1/3 px-4 py-2 bg-green-700 font-medium">{row[0]}</td>
                    <td className="px-4 py-2">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 RATINGS */}
          <div className="bg-green-800 text-white p-6 rounded">

            <h2 className="text-center text-xl font-semibold mb-6">
              Ratings & Reviews
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT */}
              <div>
                <h1 className="text-4xl text-yellow-300 font-bold">
                  4.7/5 ★★★★★
                </h1>
                <p className="text-sm">Reviewed by 290 Users</p>

                {[76,11,2,3,8].map((val,i)=>(
                  <div key={i} className="flex items-center gap-2 mt-2 text-sm">
                    <span>{5-i}★</span>
                    <div className="flex-1 bg-green-600 h-2 rounded">
                      <div className="bg-white h-2 rounded" style={{width:`${val}%`}}></div>
                    </div>
                    <span>{val}%</span>
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-3">User Satisfaction</h3>

                {[
                  ["Response",88],
                  ["Quality",85],
                  ["Delivery",87],
                ].map((item,i)=>(
                  <div key={i} className="mb-3 text-sm">
                    <div className="flex justify-between">
                      <span>{item[0]}</span>
                      <span>{item[1]}%</span>
                    </div>
                    <div className="bg-green-600 h-2 rounded">
                      <div className="bg-white h-2 rounded" style={{width:`${item[1]}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* 🔥 CONTACT */}
          

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;