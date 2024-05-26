"use client";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { FaChartColumn } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";
const SideBar = () => {
  const [openAccount, setOpenAccount] = useState(false);
  return (
    <div className=" h-screen ">
      <div className=" w-full">
        <div className=" bg-black text-white px-4  py-4 w-full flex items-center justify-between">
          <div className=" border-white border-[2px] w-8 h-8 flex items-center justify-center rounded-full">
            <h2 className=" text-white font-semibold text-xl">
              {" "}
              <Link href={"/"}>P</Link>{" "}
            </h2>
          </div>
          <HiMenuAlt3 className=" cursor-pointer font-semibold text-xl text-white" />
        </div>
        <div className=" w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2">
          <MdDashboard
            className={`
              text-2xl text-gray-600`
           }
          />
          <Link href={'/dashboard'} className={`text-blue-500 cursor-pointer `}> Dashboard</Link>
        </div>
        <div className=" w-full px-4 py-3 border-gray-200 border-b-[2px]    flex items-center gap-2">
          <BiImageAdd className={` text-2xl text-gray-600`} />
          <Link href={'dashboard/addProduct'} className={`cursor-pointer text-gray-600`}> Add Product</Link>
        </div>
        <div className="w-full px-4 py-3 border-gray-200 border-b-[2px]">
          <div className=" w-full flex items-center gap-3">
            <FaChartColumn className=" text-2xl text-gray-600" />
            <p className=" flex items-center w-full justify-between text-gray-600">
              {" "}
              Account{" "}
              <span className=" cursor-pointer">
                {openAccount ? (
                  <IoIosArrowDown onClick={() => setOpenAccount(false)} />
                ) : (
                  <IoIosArrowForward onClick={() => setOpenAccount(true)} />
                )}
              </span>
            </p>
          </div>
          {openAccount && (
            <div className=" mt-2 flex flex-col gap-2">
              <Link href={"addAccount/profile"} className=" border-gray-200 cursor-pointer border-[2px] py-2 px-2 rounded-md text-gray-600">
                Profile
              </Link>
              <Link href={"addAccount/editProfile"} className=" border-gray-200 cursor-pointer border-[2px] py-2 px-2 rounded-md text-gray-600">
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        <div className=" w-full px-4 py-3 border-gray-200 border-b-[2px]    flex items-center gap-2">
          <FaMessage className=" text-2xl text-gray-600" />
          <Link href={"/dashboard/reportBug"} className=" cursor-pointer text-gray-600"> Report Bug</Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
