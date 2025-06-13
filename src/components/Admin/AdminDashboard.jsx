import React, { useEffect, useState } from "react";

const allowedStatuses = [
  "Pending",
  "Processing",
  "Out For Delivery",
  "Delivered",
  "Cancelled",
  "Other",
];

const AdminOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [updates, setUpdates] = useState({}); // Track status & message per order
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
          setError(null);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("Server error fetching orders");
      }
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [token]);

  const handleStatusChange = (orderId, newStatus) => {
    setUpdates((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], status: newStatus }
    }));
  };

  const handleStatusMessageChange = (orderId, msg) => {
    setUpdates((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], statusMessage: msg }
    }));
  };

  const handleUpdateClick = async (orderId) => {
    const { status, statusMessage = "" } = updates[orderId] || {};
    if (!status) return alert("Select a status before updating.");

    setUpdatingOrderId(orderId);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, statusMessage }),
      });
      const data = await res.json();

      if (res.ok) {
        // Update the order in state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
        // Clear updates for this order
        setUpdates((prev) => {
          const updated = { ...prev };
          delete updated[orderId];
          return updated;
        });
      } else {
        setError(data.message || "Failed to update status");
      }
    } catch (err) {
      setError("Server error while updating order status");
    }
    setUpdatingOrderId(null);
  };

  if (loadingOrders) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Orders Dashboard</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Products</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const update = updates[order._id] || {};
              const selectedStatus = update.status || order.status;
              const statusMessage = update.statusMessage || "";

              return (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.user?.email || "N/A"}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc pl-4">
                      {order.products.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.title || "Unnamed"} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2">₹{order.totalPrice}</td>
                  <td className="px-4 py-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2 py-1 rounded text-white cursor-pointer ${selectedStatus === "Pending"
                          ? "bg-yellow-500"
                          : selectedStatus === "Processing"
                            ? "bg-blue-500"
                            : selectedStatus === "Delivered"
                              ? "bg-green-600"
                              : selectedStatus === "Cancelled"
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                    >

                      {allowedStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {selectedStatus === "Other" && (
                      <input
                        type="text"
                        placeholder="Enter status message"
                        className="mt-2 w-full border px-2 py-1 rounded"
                        value={statusMessage}
                        onChange={(e) =>
                          handleStatusMessageChange(order._id, e.target.value)
                        }
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleUpdateClick(order._id)}
                      disabled={updatingOrderId === order._id}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      {updatingOrderId === order._id ? "Updating..." : "Update"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersDashboard;
