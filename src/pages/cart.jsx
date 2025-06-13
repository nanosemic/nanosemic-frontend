import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoad } from "../context/loading";
import { clearUser } from "../redux/user/userSlice"; // Adjust the import path as needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { loading, setLoading } = useLoad();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/items`, {
        withCredentials: true,
      });

      if (response.status === 406) {
        dispatch(clearUser());
        throw new Error("Unauthorized access. Please log in again.");
      }

      const cart = response.data;
      console.log("Fetched cart:", cart);
      if (cart && Array.isArray(cart.products)) {
        setCartItems(cart.products);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    // const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/cart/update/${productId}`,
        {
          quantity:newQuantity
        },{ withCredentials:true  }
      );
      // const data = await response.json();
      if (res.status!=201 && res.status!=200) throw new Error(res.data.message);
      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    // const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/cart/remove/${productId}`,
        {
          withCredentials:true,
        },
        
      );
      // const data = await response.json();
      if (res.status!=201 && res.status!=200) throw new Error(res.data.message);
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  // const handleClearCart = async () => {

  //   try {
  //     const res = await axios.put("http://localhost:3000/api/cart/clear", {
  //      withCredentials:true,
  //     });
      
  //     if (res.status!=201 && res.status!=200) throw new Error(res.data.message);
  //     setCartItems([]);
  //   } catch (error) {
  //     console.error("Failed to clear cart", error);
  //   }
  // };

  // Calculate subtotal using discounted prices
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      const discount = item.product?.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return acc + discountedPrice * item.quantity;
    }, 0);
  };

  return (
     <div className="bg-white min-h-screen px-4 py-8 text-gray-800">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* LEFT: CART ITEMS */}
      <div className="md:col-span-2 space-y-6">
        {cartItems.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl text-gray-600 font-medium"
          >
            Your cart is empty!
          </motion.p>
        ) : (
          cartItems.map((item) => {
            const price = item.product?.price || 0;
            const discount = item.product?.discount || 0;
            const discountedPrice = price * (1 - discount / 100);
            return (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-6"
              >
                {/* IMAGE */}
                <img
                  src={item.product?.imageUrls[0] || "/placeholder.jpg"}
                  alt={item.product?.title}
                  className="w-32 h-32 object-contain"
                />

                {/* DETAILS */}
                <div className="flex-1 ml-4">
                  <h2 className="font-semibold text-lg">{item.product?.title}</h2>
                  <p className="text-sm text-gray-500">Size: {item.product?.size || 'UK 9'}</p>
                  <p className="text-sm text-gray-500">Style #: {item.product?.style || 'N/A'}</p>

                  <div className="mt-2">
                    <span className="text-red-600 font-bold text-lg mr-2">
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through">₹{price.toFixed(2)}</span>
                  </div>
                </div>

                {/* QUANTITY + REMOVE */}
                <div className="flex items-center gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      item.quantity > 1 ? (
                      handleUpdateQuantity(item.product._id, item.quantity - 1)):(
                        handleRemoveItem(item.product._id)
                      )
                    }
                    className="p-2 border rounded"
                  >
                    <FiMinus />
                  </button>

                  <span className="font-semibold text-lg">{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="p-2 border rounded"
                  >
                    <FiPlus />
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="ml-3 p-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-6 h-fit">
        <div className="text-green-600 font-semibold flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z" /></svg>
          You’ve earned free shipping
        </div>

        <div className="border p-4">
          <label className="text-sm text-gray-600">APPLY A PROMO CODE</label>
          <input
            type="text"
            placeholder="Enter promo code"
            className="mt-2 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">FREE</span>
          </div>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>₹{calculateSubtotal().toFixed(2)}</span>
        </div>

        <button
          onClick={() => navigate("/address")}
          className="w-full py-3 bg-black text-white font-semibold rounded hover:opacity-90"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  </div>
  );
};

export default Cart;
