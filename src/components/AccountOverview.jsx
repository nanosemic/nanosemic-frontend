import React from "react";
import { useSelector } from "react-redux";

const AccountOverview = () => {
    const {user} =  useSelector((state)=>state.user);
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.username} 👋</h2>

      {/* Profile Summary Card */}
      <div className="bg-gray-100 p-5 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-3">Profile Summary</h3>
        <div className="space-y-1">
          <p><strong>Full Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> +91 87918xxxxx</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <h4 className="text-sm text-gray-500">Total Orders</h4>
          <p className="text-xl font-bold text-indigo-600">12</p>
        </div>
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <h4 className="text-sm text-gray-500">Wishlist Items</h4>
          <p className="text-xl font-bold text-pink-500">5</p>
        </div>
        <div className="bg-white p-4 border rounded-lg shadow-sm">
          <h4 className="text-sm text-gray-500">Saved Addresses</h4>
          <p className="text-xl font-bold text-green-600">3</p>
        </div>
      </div>

      {/* Recent Orders (placeholder) */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
        <ul className="space-y-2 text-sm">
          <li>📦 Order #12345 - Delivered</li>
          <li>📦 Order #12346 - Shipped</li>
          <li>📦 Order #12347 - Processing</li>
        </ul>
      </div>
    </div>
  );
};

export default AccountOverview;
