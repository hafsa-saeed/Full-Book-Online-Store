import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import { BsFillBookmarkStarFill } from "react-icons/bs";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://full-book-online-store-nqqu-hyax2vqy0.vercel.app/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {FavouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold text-zinc-500 flex flex-col items-center justify-center w-full h-[80vh]">
          No Favourite Books
          <BsFillBookmarkStarFill className="text-blue-500 text-7xl mt-4" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {FavouriteBooks.map((items, i) => (
            <BookCard key={i} data={items} favourite={true} />
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
