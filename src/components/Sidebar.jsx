import { useNavigate, useParams } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const { name } = useParams(); // current active product

  const products = [
    { name: "Fresh Green Chilli", slug: "green-chilli" },
    { name: "Fresh Pomegranates", slug: "pomegranate" },
    { name: "Fresh Ginger", slug: "ginger" },
    { name: "Fresh Garlic", slug: "garlic" },
    { name: "Dry Red Chilli", slug: "red-chilli" },
    { name: "Fresh Elephant Yam Suran", slug: "elephant-yam" },
    { name: "Onion", slug: "onion" },
    { name: "Lemon", slug: "lemon" },
    { name: "Tamarind", slug: "tamarind" },
    { name: "Curry Leaves", slug: "curry-leaves" },
    { name: "Drumsticks", slug: "drumsticks" },
  ];

  return (
    <div className="bg-green-700 text-white rounded shadow">

      {/* HEADER */}
      <div className="bg-yellow-400 text-black px-4 py-2 font-semibold">
        ▶ Our Products
      </div>

      {/* LIST */}
      <div className="p-2">
        {products.map((item, index) => (
          <div key={index}>

            <div
              onClick={() => navigate(`/product/${item.slug}`)}
              className={`cursor-pointer px-3 py-2 text-sm border-b border-white/20 hover:bg-green-600 transition ${
                name === item.slug ? "bg-green-600 font-semibold" : ""
              }`}
            >
              › {item.name}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;