import { useNavigate } from "react-router-dom";
import CarouselLib from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// ✅ FIX for Vite
const Carousel = CarouselLib?.default || CarouselLib;

const products = [
  { img: "/greenchilli.jpg", name: "Fresh Green Chilli", slug: "green-chilli" },
  { img: "/Yam.jpg", name: "Elephant Yam Suran", slug: "elephant-yam" },
  { img: "/chilli2.jpg", name: "Red Chilli", slug: "red-chilli" },
  { img: "/ginger.jpg", name: "Organic Ginger", slug: "ginger" },
  { img: "/Curry.jpg", name: "Curry Leaves", slug: "curry-leaves" },
  { img: "/drum.jpg", name: "Drum Sticks", slug: "drumsticks" },
  { img: "/garlic.jpg", name: "Garlic", slug: "garlic" },
  { img: "/pomegranate.jpg", name: "Pomegranate", slug: "pomegranate" },
  { img: "/lemon.jpeg", name: "Lemon", slug: "lemon" },
  { img: "/onion.jpg", name: "Onions", slug: "onion" },
  { img: "/tamarind.jpg", name: "Tamarind", slug: "tamarind" },
];

function Hero() {
  const navigate = useNavigate();

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  const handleClick = (slug) => {
    console.log("Navigating:", slug); // ✅ debug
    navigate(`/product/${slug}`);
  };

  return (
    <div className="bg-green-700 py-4 md:py-6 px-2 md:px-4">

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
        arrows
        itemClass="px-1 md:px-2"
      >
        {products.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item.slug)} // ✅ direct slug
            className="relative group text-center cursor-pointer"
          >

            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-32 sm:h-36 md:h-44 object-cover border-2 border-white rounded"
            />

            {/* OVERLAY (DO NOT BLOCK CLICK) */}
            <div className="pointer-events-none absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <p className="text-white text-xs md:text-sm font-semibold">
                View Details
              </p>
            </div>

            {/* NAME */}
            <p className="text-white mt-1 md:mt-2 text-xs md:text-sm font-medium">
              {item.name}
            </p>

          </div>
        ))}
      </Carousel>

    </div>
  );
}

export default Hero;