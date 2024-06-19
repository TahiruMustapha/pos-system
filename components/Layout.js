import Link from "next/link";
import React from "react";

const Layout = () => {
  return (
    <div className=" w-full h-full  bg-[#050C9C]">
      <header className="  py-4">
        <nav className=" w-[80%] mx-auto flex items-center justify-between">
          <div className=" border-white border-[2px] w-8 h-8 flex items-center justify-center rounded-full">
            <h2 className=" text-white font-semibold text-xl">P</h2>
          </div>

          <div className="text-white  flex items-center gap-4">
            <Link
              className=" hover:bg-blue-500 rounded-md duration-200 px-2 py-2 "
              href={"/register"}
            >
              Register
            </Link>
            <Link
              className=" hover:bg-blue-500 rounded-md duration-200 px-2 py-2 "
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </nav>
      </header>
      <div className="w-[80%] mx-auto mt-6 flex items-center">
        <div className=" flex-1">
          <h2 className=" capitalize mb-3 text-white font-semibold text-3xl">
            Inventory & stock <br /> management <br /> solution
          </h2>
          <p className=" text-white text-xl mb-3">
            Inventory sytem to support and manage products in the pharmacy in
            real time and integrated to make it easier to develop your business.
          </p>
          <p className=" border-white border-[2px] inline-block text-white font-semibold rounded-md capitalize mt-3 px-3 py-2">
            Free Trial 1 month
          </p>
          <div className=" flex gap-3 items-center text-white mt-4">
            <div>
              <h2 className=" font-semibold text-3xl">14k</h2>
              <p>Brand Owners</p>
            </div>
            <div>
              <h2 className=" font-semibold text-3xl">23k</h2>
              <p>Active Users</p>
            </div>
            <div>
              <h2 className=" font-semibold text-3xl">500+</h2>
              <p>Partners</p>
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <img src="/med3.png" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
