import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomCartPopup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const checkCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const cart = await res.json();

      if (cart?.products && cart.products.length > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    } catch (error) {
      setShow(false);
    }
  };

  useEffect(() => {
    // Initial check on mount
    checkCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      checkCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer z-50 animate-slideUp"
      onClick={() => navigate("/cart")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate("/cart");
      }}
      aria-label="Go to cart"
    >
      You have items in your cart. Click here to go to Cart and complete your purchase.
    </div>
  );
};

export default BottomCartPopup;
