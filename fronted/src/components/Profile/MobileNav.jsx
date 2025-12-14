import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex items-center justify-between mt-4 md:hidden gap-2">
          <Link
            to="/profile"
            className="flex-1 text-center text-zinc-100 font-semibold py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all duration-300"
          >
            Favourites
          </Link>

          <Link
            to="/profile/orderHistory"
            className="flex-1 text-center text-zinc-100 font-semibold py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all duration-300"
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className="flex-1 text-center text-zinc-100 font-semibold py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex items-center justify-between mt-4 md:hidden gap-2">
          <Link
            to="/profile"
            className="flex-1 text-center text-zinc-100 font-semibold py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all duration-300"
          >
            All Orders
          </Link>

          <Link
            to="/profile/add-book"
            className="flex-1 text-center text-zinc-100 font-semibold py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileNav;
