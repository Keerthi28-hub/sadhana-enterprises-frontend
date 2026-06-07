import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");

      const data = await res.json();

      console.log("Products:", data);

      if (data.success) {
        setProducts(data.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= SHOW PRODUCTS ================= */

  const visibleProducts = showAll
    ? products
    : products.slice(0, 12);

  /* ================= NAVIGATE ================= */

  const handleClick = (slug) => {
    console.log("Navigating to:", slug);

    navigate(`/product/${slug}`);
  };

  return (
    <div className="bg-green-700 px-4 md:px-6 py-5 rounded-lg">

      {/* TITLE */}
      <div className="bg-white text-green-700 font-semibold px-4 py-3 rounded shadow text-sm md:text-base">
        ▶ Fresh Products
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-4 mt-5 text-white text-sm md:text-base">

        {visibleProducts.map((item, index) => (
          <div
            key={index}
            className="flex flex-col"
          >

            {/* PRODUCT NAME */}
            <div
              onClick={() => handleClick(item.slug)}
              className="cursor-pointer hover:text-green-200 transition font-medium"
            >
              › {item.name}
            </div>

            {/* BORDER */}
            <div className="border-b border-white/30 mt-2"></div>

          </div>
        ))}

      </div>

      {/* SHOW MORE */}
      {products.length > 12 && (
        <div className="flex justify-center mt-6">

          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-white text-green-700 px-5 py-2 rounded font-medium hover:bg-green-100 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>

        </div>
      )}

    </div>
  );
}

export default ProductsSection;