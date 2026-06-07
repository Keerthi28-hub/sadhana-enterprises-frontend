import { useNavigate } from "react-router-dom";
import {
  FaBriefcase, FaUsers, FaFileAlt,
  FaBalanceScale, FaChartLine, FaGlobe, FaIdCard
} from "react-icons/fa";

function WelcomeSection() {
  const navigate = useNavigate();

  const data = [
    { icon: <FaBriefcase />, title: "Nature of Business", value: "Trader - Wholesaler/Distributor" },
    { icon: <FaUsers />, title: "Total Number of Employees", value: "Upto 12 People" },
    { icon: <FaFileAlt />, title: "GST Registration Date", value: "1-12-2025" },
    { icon: <FaChartLine />, title: "Annual Turnover", value: "35 Lakhs" },
    { icon: <FaGlobe />, title: "Import Export Code (IEC)", value: "AICPM43445" },
    { icon: <FaIdCard />, title: "GST No.", value: "36AICPM4344H1ZC" },
  ];

  return (
    <div className="bg-[#0f7a34] px-6 py-8 text-white">

      <h2 className="text-white text-lg font-semibold mb-6">
        Welcome to Sadhana Enterprises
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-12">

        {data.map((item, i) => (
          <div key={i} className="flex items-start gap-3">

            <div className="bg-white text-green-700 rounded-full p-2">
              {item.icon}
            </div>

            <div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-green-100 text-sm">{item.value}</p>
            </div>

          </div>
        ))}

      </div>

      <button
        onClick={() => navigate("/about")}
        className="mt-6 border border-white text-white px-3 py-1 text-xs rounded hover:bg-white hover:text-green-700 transition"
      >
        more...
      </button>

    </div>
  );
}

export default WelcomeSection;