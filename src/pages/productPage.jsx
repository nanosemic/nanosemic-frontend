import  { useState, useEffect } from "react";
import ai from "../assets/ai.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLoad } from "../context/loading";

const Pro = () => {
  const [products, setProducts] = useState([]);
  const {loading,setLoading} = useLoad();
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };



  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/product/get`
          // "https://nanosemic-backend.onrender.com/api/product/get"
        );
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, []);

  return (
    <>
      {/* Header Section - Smaller Layout */}
      <section className="relative bg-[#111827] text-white h-[70vh] flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={ai}
            alt="Advanced Sensors Background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>

        {/* Foreground Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Pioneering Products for the Next Era
          </h2>
          <p className="text-lg text-gray-300 mb-3 leading-relaxed">
            Explore our portfolio of high-precision raw materials and
            intelligent sensor systems. Whether you're building, innovating, or
            scaling, our products ensure real-world performance and unmatched
            reliability.
          </p>
          <p className="text-gray-400 text-md">
            Trusted by researchers, engineers, and consumers.
          </p>
        </motion.div>
      </section>

      {/* Product Description with viewport animation */}
      <motion.section
        className="bg-gradient-to-b from-white to-gray-100 py-16 px-4"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-800">
            What Sets Our Products Apart?
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every product in our lineup is  quality-tested.
            We believe in providing durable, efficient, and high-performing
            components that empower your tech stack, whether you're prototyping
            or scaling production.
          </p>
        </div>
      </motion.section>

      {/* Featured Products - Updated Theme */}
      <section className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white py-16 px-4">
        <h2 className="text-center text-4xl font-bold mb-10">
          Featured Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="bg-[#f1f5f9] p-5 rounded-xl shadow-sm border border-gray-300 hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${product._id}`}>
              <img
                src={product.imageUrls[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-200"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">Rs. {(product.price - (product.discount * product.price) / 100).toFixed(2)}</p>
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description || "No description available."}
              </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Pro;
