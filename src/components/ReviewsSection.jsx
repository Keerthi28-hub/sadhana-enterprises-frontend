function ReviewsSection() {
  const ratings = [
    { star: "5★", percentage: 76 },
    { star: "4★", percentage: 11 },
    { star: "3★", percentage: 2 },
    { star: "2★", percentage: 3 },
    { star: "1★", percentage: 8 },
  ];

  const satisfaction = [
    { label: "Response", value: 88 },
    { label: "Quality", value: 85 },
    { label: "Delivery", value: 87 },
  ];

  const reviews = [
    {
      name: "Harsha",
      location: "Bengaluru, Karnataka",
      product: "Pomegranates",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Parakh",
      location: "Ajmer, Rajasthan",
      product: "Onions",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Anita",
      location: "Kalyan, Maharashtra",
      product: "Lemons",
      rating: "⭐⭐⭐⭐☆",
    },
  ];

  return (
    <section className="bg-green-800 text-white py-10 px-4 md:px-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Ratings & Reviews
      </h2>

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* OVERALL RATING */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold">
            4.7/5 ⭐
          </h1>

          <p className="mt-3 text-green-100">
            Reviewed by 290 Users
          </p>
        </div>

        {/* STAR RATINGS */}
        <div>
          {ratings.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mb-3"
            >
              <span className="w-8">
                {item.star}
              </span>

              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>

              <span>{item.percentage}%</span>
            </div>
          ))}
        </div>

        {/* USER SATISFACTION */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            👍 User Satisfaction
          </h3>

          {satisfaction.map((item, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>

              <div className="bg-white/20 rounded-full h-2">
                <div
                  className="bg-green-300 h-2 rounded-full"
                  style={{
                    width: `${item.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-12">

        <h3 className="text-xl font-semibold mb-6">
          Most Relevant Reviews
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-lg p-5"
            >

              <div className="text-yellow-300 mb-2 text-lg">
                {review.rating}
              </div>

              <h4 className="font-semibold text-lg">
                {review.name}
              </h4>

              <p className="text-sm text-green-100">
                {review.location}
              </p>

              <p className="mt-3 text-sm">
                Product:{" "}
                <span className="font-medium">
                  {review.product}
                </span>
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ReviewsSection;