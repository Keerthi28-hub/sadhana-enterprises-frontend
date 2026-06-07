import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ShowcaseCarousel from "../components/ShowcaseCarousel";
import RequirementBox from "../components/RequirementBox";

function ReviewsPage() {
  const [sort, setSort] = useState("top");

  const reviews = [
    { name: "Nafees", place: "Pune", product: "Pomegranates" },
    { name: "Harsha", place: "Bangalore", product: "Pomegranates" },
    { name: "Parakh", place: "Ajmer", product: "Mangoes" },
    { name: "Vishal", place: "Jalna", product: "Banana" },
    { name: "Sathya", place: "AP", product: "Banana" },
    { name: "Salim", place: "Mumbai", product: "Banana" },
    { name: "Sujit", place: "Sangli", product: "Mangoes" },
    { name: "Paribhasha", place: "Bangalore", product: "Yam" },
    { name: "Anand", place: "Mumbai", product: "Vegetables" },
    { name: "Manoj", place: "Nashik", product: "Grapes" },
  ];

  return (
    <div className="bg-[#5f7f0b] min-h-screen">

      <div className="flex">

        {/* ✅ SIDEBAR */}
        <div>
          <Sidebar />

          {/* ✅ SHOWCASE ONLY IN REVIEWS PAGE */}
          <div className="p-3">
            <ShowcaseCarousel />
          </div>
        </div>

        {/* ✅ RIGHT CONTENT */}
        <div className="flex-1 p-6 text-white">

          {/* TITLE */}
          <h2 className="text-center text-2xl mb-6">
            Ratings & Reviews
          </h2>

          {/* RATINGS */}
          <div className="flex justify-between mb-8">

            <div>
              <h1 className="text-3xl font-bold">
                4.7/5 ⭐⭐⭐⭐⭐
              </h1>
              <p>Reviewed by 291 Users</p>
            </div>

            <div className="space-y-2 w-[250px]">
              {["76%", "11%", "2%", "3%", "8%"].map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{5 - i}★</span>

                  <div className="bg-gray-300 h-2 w-full">
                    <div
                      className="bg-green-400 h-2"
                      style={{ width: p }}
                    ></div>
                  </div>

                  <span>{p}</span>
                </div>
              ))}
            </div>

            <div>
              <p>👍 User Satisfaction</p>
              <p>Response 88%</p>
              <p>Quality 85%</p>
              <p>Delivery 86%</p>
            </div>

          </div>

          {/* SORT */}
          <div className="mb-4">
            Sort by:
            <select
              className="ml-2 text-black"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="top">Top Reviews</option>
              <option value="latest">Latest Reviews</option>
            </select>
          </div>

          {/* REVIEWS */}
          <div className="space-y-6">
            {reviews.map((r, i) => (
              <div key={i}>

                <p className="font-semibold">
                  {r.name} | {r.place}
                </p>

                <p className="text-yellow-300">★★★★★</p>

                <p className="text-sm">
                  Product: {r.product}
                </p>

              </div>
            ))}
          </div>

          {/* REQUIREMENT BOX */}
          <div className="mt-10">
            <RequirementBox />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;