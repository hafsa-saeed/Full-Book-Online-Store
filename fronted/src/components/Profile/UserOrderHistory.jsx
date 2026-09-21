import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://full-book-online-store-nqqu-hyax2vqy0.vercel.app/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrderHistory([]);
      }
    };
    fetchOrders();
  }, []);

  // 🟢 Loader while fetching
  if (!orderHistory)
    return (
      <div className="flex items-center justify-center h-[80vh] bg-zinc-950">
        <Loader />
      </div>
    );

  // 🟢 Empty state
  if (orderHistory.length === 0)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-zinc-950 text-center p-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-6">
          No Order History
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
          alt="no orders"
          className="h-[25vh] mb-6 opacity-90"
        />
        <p className="text-zinc-400 text-lg">
          You haven’t placed any orders yet.
        </p>
      </div>
    );

  // 🟢 Orders available
  return (
    <div className="bg-zinc-950 min-h-screen p-4 md:p-8 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8 text-center md:text-left">
        Your Order History
      </h1>

      {/* 🟩 Desktop Header Row */}
      <div className="hidden sm:flex bg-zinc-800 w-full rounded py-2 px-4 gap-2 text-zinc-300 text-sm md:text-base font-semibold">
        <div className="w-[5%] text-center">Sr.</div>
        <div className="w-[25%] text-center">Books</div>
        <div className="w-[40%] text-center">Description</div>
        <div className="w-[12%] text-center">Price</div>
        <div className="w-[10%] text-center">Status</div>
        <div className="hidden md:block w-[8%] text-center">Mode</div>
      </div>

      {/* 🟦 Orders List */}
      {orderHistory.map((order, index) => (
        <div
          key={order._id}
          className="bg-zinc-900 w-full rounded-lg py-3 px-4 mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-zinc-800 hover:border-zinc-700 transition"
        >
          {/* 🟨 Mobile layout */}
          <div className="flex justify-between items-center sm:hidden mb-2">
            <span className="text-zinc-400 text-sm">Order #{index + 1}</span>
            <span
              className={`font-semibold ${
                order.status === "Delivered"
                  ? "text-red-500"
                  : order.status === "Pending"
                  ? "text-yellow-400"
                  : "text-green-500"
              }`}
            >
              {order.status || "Pending"}
            </span>
          </div>

          {/* 🟢 Sr. Number (Desktop only) */}
          <div className="hidden sm:block w-[5%] text-center">{index + 1}</div>

          {/* 🟢 Book Title (Clickable) */}
          <div
            onClick={() => navigate(`/view-book-details/${order.book?._id}`)}
            className="sm:w-[25%] text-center text-blue-400 font-semibold cursor-pointer hover:underline mb-2 sm:mb-0"
          >
            {order.book?.title || "Unknown"}
          </div>

          {/* 🟢 Description */}
          <div className="text-center sm:w-[40%] text-zinc-400 text-sm mb-2 sm:mb-0">
            {order.book?.desc
              ? order.book.desc.slice(0, 80) + "..."
              : "No description"}
          </div>

          {/* 🟢 Price */}
          <div className="text-center sm:w-[12%] font-semibold mb-2 sm:mb-0">
            ₹ {order.book?.price || 0}
          </div>

          {/* 🟢 Status (Desktop only) */}
          <div
            className={`hidden sm:block w-[10%] text-center font-semibold ${
              order.status === "Delivered"
                ? "text-red-500"
                : order.status === "Pending"
                ? "text-yellow-400"
                : "text-green-500"
            }`}
          >
            {order.status || "Pending"}
          </div>

          {/* 🟢 Mode (Desktop only) */}
          <div className="hidden md:block w-[8%] text-center text-zinc-400">
            {order.mode || "Online"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderHistory;
