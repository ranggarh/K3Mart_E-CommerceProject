import { useState } from "react";

const Carousel = () => {
  // Define images or content for the carousel
  const slides = [
    {
      image: "https://png.pngtree.com/thumb_back/fh260/back_our/20190614/ourmid/pngtree-taobao-carousel-background-image-image_122191.jpg",
      title: "We Picked Every Item With Care",
      subtitle: "You Must Try",
      description: "Use this code to receive 50% discount off all products",
    },
    {
      image: "https://source.unsplash.com/random/800x400?fashion2",
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
        className="w-full h-96 bg-cover bg-center flex items-center justify-start"
        style={{
          backgroundImage: `url(${slides[currentIndex].image})`,
        }}
      >
        <div className=" text-white ml-20 p-4 bg-opacity-50 bg-black">
          <h2 className="text-2xl font-bold">{slides[currentIndex].title}</h2>
          <h3 className="text-lg font-semibold">{slides[currentIndex].subtitle}</h3>
          <p className="text-sm">{slides[currentIndex].description}</p>
          <button className="mt-4 px-4 py-2 bg-gray-800 rounded text-white hover:bg-gray-700">
            Go to Collection →
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>

      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>

      </button>
    </div>
  );
};

export default Carousel;
