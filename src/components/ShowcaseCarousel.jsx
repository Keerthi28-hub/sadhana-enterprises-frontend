import { useState } from "react";
import CarouselLib from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import QuoteModal from "./QuoteModal";

// Fix for Vite import
const Carousel = CarouselLib?.default || CarouselLib;

const products = [
  { img: "/greenchilli.jpg", name: "Fresh Green Chilli" },
  { img: "/Curry.jpg", name: "Curry Leaves" },
  { img: "/chilli2.jpg", name: "Red Chilli" },
  { img: "/ginger.jpg", name: "Organic Ginger" },
  { img: "/drum.jpg", name: "Drum Sticks" },
  { img: "/garlic.jpg", name: "Garlic" },
  { img: "/lemon.jpeg", name: "Lemon" },
  { img: "/pomegranate.jpg", name: "Pomegranate" },
  { img:"/onion.jpg", name: "Onions"},
  { img:"/tamarind.jpg", name: "Tamarind"},
  { img:"Yam.jpg", name: "Elephant Yam Suran"},
];

function ShowcaseCarousel() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (
    <div className="bg-green-700 px-6 py-8">

      <h2 className="text-white text-lg font-semibold mb-6">
        Showcase Gallery
      </h2>

      {typeof Carousel === "function" && (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2000}
          arrows
          itemClass="px-2"
        >
          {products.map((item, index) => (
            <div key={index} className="text-center">

              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover border-2 border-white rounded transition hover:scale-105"
              />

              <p className="text-white mt-2 text-sm font-medium">
                {item.name}
              </p>

              <button
                onClick={() => setSelectedProduct(item)}
                className="mt-2 bg-white text-green-700 text-xs px-3 py-1 rounded font-semibold hover:bg-green-100 transition"
              >
                Get Best Quote
              </button>

            </div>
          ))}
        </Carousel>
      )}

      {/* MODAL */}
      {selectedProduct && (
        <QuoteModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ShowcaseCarousel;