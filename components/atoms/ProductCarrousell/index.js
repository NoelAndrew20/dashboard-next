import { useState } from "react";

const ProductCarrousell = ({ futureData, setFutureData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? futureData.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === futureData.length - 1 ? 0 : prevIndex + 1
        );
      };
    return(
        <div className="carrousel">
            {futureData.map((item, index) => (
              <div
                key={index}
                className={`transform transition-transform duration-300 ${
                  index === currentIndex ? '' : 'scale-0'
                }`}
              >
                <div className="w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-100 peer-checked:opacity-100 peer-checked:z-10 z-0">
                  <div className="py-4 px-8">
                    <h1 className="hover:cursor-pointer mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                      {item.nombre}
                    </h1>
                    <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                      SKU: {item.SKU}
                    </p>
                    <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                      Unidad: {item.unidad}
                    </p>
                    <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                      Precio: {item.precio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Controls */}
            <div className=" flex justify-between z-20">
              <button
                onClick={handlePrev}
                className="inline-block text-blue-500 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="inline-block text-blue-500 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

    )
}
export default ProductCarrousell;