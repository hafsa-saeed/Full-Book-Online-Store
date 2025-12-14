import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    language: "",
    price: "",
    desc: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.language === "" ||
        Data.price === "" ||
        Data.desc === ""
      ) {
        alert("All fields are required");
      } else {
        // TODO: change this API if your backend has an update route
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          language: "",
          price: "",
          desc: "",
        });
        alert(response.data.message || "Book updated successfully!");
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>

      <div className="p-4 bg-zinc-800 rounded">
        {/* Image */}
        <div>
          <label className="text-zinc-400">Image</label>
          <input
            type="text"
            name="url"
            placeholder="url of image"
            value={Data.url}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        {/* Title */}
        <div className="mt-4">
          <label className="text-zinc-400">Title of Book</label>
          <input
            type="text"
            name="title"
            placeholder="title of book"
            value={Data.title}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        {/* Author */}
        <div className="mt-4">
          <label className="text-zinc-400">Author of Book</label>
          <input
            type="text"
            name="author"
            placeholder="author of book"
            value={Data.author}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          />
        </div>

        {/* Language and Price */}
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              name="language"
              placeholder="language of book"
              value={Data.language}
              onChange={change}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>

          <div className="w-3/6">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              name="price"
              placeholder="price of book"
              value={Data.price}
              onChange={change}
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="text-zinc-400">Description of Book</label>
          <textarea
            name="desc"
            placeholder="description of book"
            rows="5"
            value={Data.desc}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
          ></textarea>
        </div>

        {/* Button */}
        <button
          className="mt-4 px-3 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition-all"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
