import { useState } from "react";

const Carousel = () => {
  // Define images or content for the carousel
  const slides = [
    {
      image: "/products/carousel1.jpg",
      title: "Safety First With Our Products",
      subtitle: "You Must Try",
      description: "Use this code to receive 50% discount off all products",
    },
    {
      image: "/products/tes1.jpg",
      title: "Exclusive Collection Just For You",
      subtitle: "Shop Now",
      description: "Get the best deals on top fashion trends!",
    },
    // Add more slides as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full  mx-auto overflow-hidden">
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-start"
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
        }}
      >
        <div className=" text-white ml-36 p-4 bg-opacity-50 rounded bg-black">
          <h2 className="text-2xl font-bold">{slides[currentIndex].title}</h2>
          <h3 className="text-lg font-semibold">{slides[currentIndex].subtitle}</h3>
          <p className="text-sm">{slides[currentIndex].description}</p>
          <button style={{ backgroundColor: "#0f4c5c" }} className="mt-4 px-4 py-2 rounded text-white hover:bg-gray-700">
            Go to Collection →
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        style={{ backgroundColor: "#0f4c5c" }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>

      </button>
      <button
        onClick={handleNext}
        style={{ backgroundColor: "#0f4c5c" }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>

      </button>
    </div>
  );
};

export default Carousel;
