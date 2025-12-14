import React from "react";
import Bimage from "../../assets/Bimage.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lgLtext-left">
          {/* Turn Pages, Discover Worlds */}
          Discover Your Next Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          {/* A world where every page opens a new journey — explore, shop, and enjoy books 
           that inspire minds and spark imaginations. */}
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our created collection of books
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-2/4 h-auto lg:h-[100%] flex items-center justify-center">
        <img src={Bimage} alt="logo" className="" />
      </div>
    </div>
  );
};

export default Hero;
