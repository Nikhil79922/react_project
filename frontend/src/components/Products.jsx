/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Typewriter from 'react-typewriter-effect';
import { useSelector } from 'react-redux';

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [collection, setcollection] = useState([])

//Redux
  const globalLink=useSelector((state)=>state.link);


  const display = async () => {
    try {
      const response = await fetch(globalLink+'/products');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();


      setcollection(data)
      console.log(collection)
    } catch (err) {
      console.error('Fetch error:', err);
    }

  }

  useEffect(() => {
    // display()

  }, [])


  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6 mb-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold leading-tight"> <Typewriter
          textStyle={{ fontFamily: 'Arial, sans-serif', fontSize: '3rem', fontWeight: 'bold' }}
          startDelay={500}
          cursorColor="#ffcb05"
          multiText={[
            "Top Picks in Tech Innovation",
            "Cutting-Edge Tech Solutions",
            "Latest in Advanced Technology",
            "Premium Technical Products",
            "Exclusive High-Tech Collection",
            "Trending Technical Devices",
            "Innovative Products for Tech Enthusiasts",
            "State-of-the-Art Technology Showcase",
            "Tech Must-Haves of the Year",
            "Top-Rated Technology Essentials",
          ]}
          multiTextDelay={2000} // Delay between each text
          typeSpeed={80}
          deleteSpeed={50}
          loop={true} // Ensure this is set to true for continuous loop
        /></h2>
      </div>

      {/* Products Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {collection.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 hover:bg-gray-700 text-white shadow-lg rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-md border border-gray-700 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold mb-2 text-teal-400">{product.price}</p>
              <p className="text-sm text-gray-400 mb-4">{product.description}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg w-full transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
