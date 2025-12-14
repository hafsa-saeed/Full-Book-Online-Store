import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [statusValue, setStatusValue] = useState(""); // stores selected status
  const [userDivData, setUserDivData] = useState(null);
  const [statusDiv, setStatusDiv] = useState("hidden");

  // ✅ include role for admin actions
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    role: localStorage.getItem("role") || "user",
  };

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusUpdate = async (orderId) => {
    if (!statusValue) return alert("Please select a status first!");

    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        { status: statusValue },
        { headers } // ✅ must include role
      );

      if (response.status === 200) {
        alert("Order status updated successfully ✅");

        // Update UI
        setAllOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: statusValue } : order
          )
        );

        // Reset dropdown and selection
        setSelectedOption(null);
        setStatusValue("");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        error.response?.data?.message || "Failed to update order status ❌"
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-4">
      {!allOrders.length ? (
        <div className="h-[80vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8">
            All Orders
          </h1>

          {/* Header */}
          <div className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-semibold">
            <div className="w-[5%] text-center">Sr.</div>
            <div className="w-[35%] md:w-[20%] text-center">Books</div>
            <div className="hidden md:block md:w-[40%] text-center">
              Description
            </div>
            <div className="w-[15%] md:w-[10%] text-center">Price</div>
            <div className="w-[25%] md:w-[15%] text-center">Status</div>
            <div className="w-[10%] md:w-[5%] text-center">
              <FaUserLarge />
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-2 mt-2">
            {allOrders.map((items, i) => (
              <div
                key={i}
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 items-center hover:bg-zinc-900 transition"
              >
                <div className="w-[5%] text-center">{i + 1}</div>

                <div className="w-[35%] md:w-[20%] text-center">
                  <Link
                    to={`view-book-details/${items?.book?._id || "#"}`}
                    className="hover:text-blue-300"
                  >
                    {items.book?.title || "Unknown"}
                  </Link>
                </div>

                <div className="hidden md:block md:w-[40%] truncate text-center">
                  {items?.book?.desc?.slice(0, 60) || "No description"}...
                </div>

                <div className="w-[15%] md:w-[10%] text-center">
                  {items?.book?.price || "N/A"}
                </div>

                <div className="w-[25%] md:w-[15%] text-center">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() =>
                      setSelectedOption(selectedOption === i ? null : i)
                    }
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>

                  {selectedOption === i && (
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <select
                        name="status"
                        value={statusValue}
                        onChange={(e) => setStatusValue(e.target.value)}
                        className="bg-gray-800 px-2 py-1 rounded text-sm"
                      >
                        <option value="">Select status</option>
                        {[
                          "Order placed",
                          "Out for delivery",
                          "Delivered",
                          "Canceled",
                        ].map((statusItem, index) => (
                          <option value={statusItem} key={index}>
                            {statusItem}
                          </option>
                        ))}
                      </select>

                      <button
                        className="text-green-500 hover:text-pink-600"
                        onClick={() => handleStatusUpdate(items._id)}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </div>

                <div className="w-[10%] md:w-[5%] text-center">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setStatusDiv("fixed");
                      setUserDivData(items.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllOrders;
