import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoad } from "../context/loading";
import { useSelector } from "react-redux";

const SummaryPage = () => {
  const [address, setAddress] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useSelector((state) => state.user);
  console.log(user)
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items
        const cartRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cart/items`,
          {
            withCredentials: true,
          }
        );
        setCartItems(cartRes.data.products || []);
        // Fetch addresses
        const userAddresses = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/my/address`,
          {
            withCredentials: true,
          }
        );
        console.log(userAddresses.data);
        setAddress(userAddresses.data.addresses[0]);
        // console.log(address)
      } catch (err) {
        console.error("Error in checkout data loading:", err);
      }
    };

    fetchData(); // call the async function
  }, []);
  const subtotal = cartItems.reduce((acc, item) => {
  const price = item.product.price || 0;
  const discount = item.product.discount || 0;
  const discountedPrice = price * (1 - discount / 100);
  return acc + discountedPrice * item.quantity;
}, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const totalPayable = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {

    try {
      const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/orders/place`,
      {
        paymentMethod: "Cash on Delivery",
      },
      { withCredentials: true }
    );

    if (res.status === 200 || res.status === 201) {
      navigate("/order-success");
    } else {
      alert("Order failed. Please try again.");
    }
    } catch (error) {
      console.error("Order error:", error);
    // const message = error.response?.data?.message || "Something went wrong.";
    }

    

  };

  const handleDeliverHere = () => {
    setSelected(true);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const handleChangeAddress = () => {
    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Left Section */}
      <div className="flex-1 space-y-6">
        {/* 1. User Credentials */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-indigo-800">
            Account Details
          </h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {/* 2. Delivery Address */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-indigo-800">
            Delivery Address
          </h2>
          {address ? (
            <div className="space-y-2">
              <p>
                {address.street}, {address.city}, {address.state}
              </p>
              <p>
                {address.zipCode}, {address.country}
              </p>

              {!selected ? (
                <button
                  className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                  onClick={handleDeliverHere}
                >
                  Deliver Here
                </button>
              ) : (
                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Deliver to this address
                    </span>
                  </label>
                  <button
                    onClick={handleChangeAddress}
                    className="px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition"
                  >
                    Change Address
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>No address found.</p>
          )}
        </div>

        {/* 3. Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4 text-indigo-800">Your Order</h2>
          {cartItems.map((item) => {
            const price = item.product.price || 0;
            const discount = item.product.discount || 0;
            const finalPrice = price * (1 - discount / 100);
            return (
              <div key={item.product._id} className="flex justify-between mb-2">
                <span>
                  {item.product.title} x {item.quantity}
                </span>
                <span>₹{(finalPrice * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        {/* Change Cart Button */}
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md text-sm hover:bg-indigo-50 transition w-fit"
        >
          Change Cart
        </button>
      </div>

      {/* Right Section: Order Summary */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold text-indigo-800">Order Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
        </div>
        <hr />
        <div className="flex justify-between text-lg font-bold">
          <span>Total Payable</span>
          <span>₹{totalPayable.toFixed(2)}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 mt-6"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default SummaryPage;
