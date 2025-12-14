import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Section */}
          <div className="w-full lg:w-3/6">
            <div className="bg-zinc-800 flex flex-col lg:flex-row justify-around p-6 md:p-12 rounded">
              {/* ✅ Responsive Image */}
              <img
                src={Data.url}
                alt={Data.title}
                className="w-full sm:max-w-sm md:max-w-md lg:w-[400px] lg:h-[500px] rounded object-contain mx-auto"
              />

              {/* ✅ Buttons */}
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 mt-6 lg:mt-0 lg:ml-6">
                  <button
                    className="bg-white rounded-full text-2xl p-3 text-red-500 flex items-center justify-center hover:scale-105 transition-transform duration-200"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    {""}
                    <span className="ml-2 lg:hidden text-sm">Favourites</span>
                  </button>
                  <button
                    className="bg-blue-500 text-white rounded-full text-2xl p-3 flex items-center justify-center hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    {""}
                    <span className="ml-2 lg:hidden text-sm">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 mt-6 lg:mt-0 lg:ml-6">
                  <Link
                    to={`/updateBook/${id}`}
                    className="bg-white rounded-full text-2xl p-3 text-red-500 flex items-center justify-center hover:scale-105 transition-transform duration-200"
                  >
                    <FaEdit />
                    {""}
                    <span className="ml-2 lg:hidden text-sm">Edit</span>
                  </Link>
                  <button
                    className="bg-blue-500 text-white rounded-full text-2xl p-3 flex items-center justify-center hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                    onClick={deleteBook}
                  >
                    <MdOutlineDelete />
                    <span className="ml-2 lg:hidden text-sm">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Section (unchanged) */}
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center text-zinc-400 ">
              <GrLanguage className="me-3" />
              {Data.language}
            </p>
            <p className="text-zinc-100 text-3xl font-semibold">
              Rs.{Data.price}
            </p>
          </div>
        </div>
      )}

      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
