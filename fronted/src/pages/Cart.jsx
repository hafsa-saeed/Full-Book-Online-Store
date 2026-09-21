import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🟢 Corrected import
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // 🟢 FIXED: moved inside component (was previously outside, caused error)

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🟢 Fetch user cart
  useEffect(() => {
    axios
      .get("http://full-book-online-store-nqqu-hyax2vqy0.vercel.app/api/v1/get-user-cart", { headers })
      .then((res) => {
        setCart(res.data.data);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // 🟢 Update total whenever Cart changes
  useEffect(() => {
    const totalPrice = Cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalPrice);
  }, [Cart]);

  // 🟢 Delete item from cart
  const deleteItem = async (bookid) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this book from your cart?"
    );
    if (!confirmDelete) return;

    try {
      await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
      alert("Book removed from your cart!");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to remove book. Please try again.");
    }
  };

  // 🟢 Place Order (fixed double alert issue + navigation)
  const placeOrder = async () => {
    if (Cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/place-order",
        { order: Cart },
        { headers }
      );

      if (res.data.success || res.status === 200) {
        alert(res.data.message || "Order placed successfully!");
        setCart([]); // clear cart
        setTotal(0);
        navigate("/profile/orderHistory"); // 🟢 FIXED: Correct navigation after success
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!Cart) return <Loader />;

  if (Cart.length === 0)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-center">
        <h1 className="text-5xl text-zinc-400 font-semibold mb-6 tracking-wide">
          Your Cart is Empty
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="empty cart"
          className="h-[45vh] opacity-90"
        />
        <p className="text-zinc-500 mt-6 text-lg">
          Add some books to your cart to see them here!
        </p>
      </div>
    );

  return (
    <div className="bg-zinc-950 min-h-screen px-4 md:px-12 py-8 flex flex-col md:flex-row md:gap-8">
      {/* 🟢 Left Side - Cart Items */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-400 mb-8 text-center md:text-left">
          Your Cart
        </h1>

        {Cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center justify-between bg-zinc-800 p-4 rounded-lg mb-4 shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Book Image */}
            <img
              src={item.url}
              alt={item.title}
              className="h-[25vh] w-[160px] md:h-[12vh] md:w-[80px] object-cover rounded mb-4 md:mb-0"
            />

            {/* Book Details */}
            <div className="flex flex-col justify-center items-center md:items-center text-center px-2 md:px-6 flex-1">
              <h2 className="text-2xl font-semibold text-zinc-100">
                {item.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-1 max-w-md">
                {item.desc.slice(0, 90)}...
              </p>
            </div>

            {/* Price and Delete Button */}
            <div className="flex items-center justify-center md:justify-end gap-4 mt-4 md:mt-0">
              <span className="text-zinc-100 text-xl font-semibold">
                ₹ {item.price}
              </span>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-md transition duration-200 hover:scale-110"
                title="Remove from Cart"
              >
                <AiFillDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 Right Side - Total Summary */}
      <div className="bg-zinc-800 h-fit p-6 rounded-lg shadow-md mt-8 md:mt-20 md:w-[300px] mx-auto md:mx-0">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
          Total Amount
        </h2>
        <p className="text-zinc-400 mb-2">
          {Cart.length} {Cart.length === 1 ? "book" : "books"}
        </p>
        <h3 className="text-zinc-100 text-xl font-bold mb-4">₹ {total}</h3>

        <button
          onClick={placeOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full transition duration-300"
        >
          Place your order
        </button>
      </div>
    </div>
  );
};

export default Cart;
