"use client";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { FaChartColumn } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
const SideBar = () => {
  const [active, setActive] = useState(false);
  const path = usePathname();
  const isActive = (pathName) => {
    return path === pathName;
  };

  return (
    <div className=" h-screen fixed  w-[19%] ">
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
        <div className={isActive('/dashboard')?`w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`:`w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`}>
          <MdDashboard
            className={
              isActive('/dashboard')
                ? ` text-2xl text-blue-500`
                : `
              text-2xl text-gray-600`
            }
          />
          <Link
            href={"/dashboard"}
            className={
              isActive('/dashboard')
                ? `text-blue-500 cursor-pointer `
                : ` text-gray-500 cursor-pointer`
            }
          >
            {" "}
            Dashboard
          </Link>
        </div>
        <div className={isActive('/dashboard/addProduct')?`w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`:`w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`}>
          <BiImageAdd
            className={
              isActive('/dashboard/addProduct') ? `text-2xl text-blue-500` : ` text-2xl text-gray-600`
            }
          />
          <Link
            href={"/dashboard/addProduct"}
            className={
              isActive("/dashboard/addProduct")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            {" "}
            Add Product
          </Link>
        </div>
        <div className={isActive('/dashboard/profile')?`w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`:`w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`}>
          <CgProfile className={
              isActive('/dashboard/profile') ? `text-2xl text-blue-500` : ` text-2xl text-gray-600`
            } />
          <Link
            href={"/dashboard/profile"}
            className={
              isActive("/dashboard/profile")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            Profile
          </Link>
        </div>
        <div className={isActive('/dashboard/editProfile')?`w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`:`w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`}>
          <FaChartColumn className={
              isActive('/dashboard/editProfile') ? `text-2xl text-blue-500` : ` text-2xl text-gray-600`
            } />
          <Link
            href={"/dashboard/editProfile"}
            className={
              isActive("/dashboard/editProfile")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            Edit profile
          </Link>
        </div>

        <div className={isActive('/dashboard/reportBug')?`w-full px-4 py-3 border-b-gray-200 border-b-[2px]  border-r-[5px] shadow-sm border-blue-500 bg-gray-100 flex items-center gap-2`:`w-full px-4 py-3 border-b-gray-200 border-b-[2px] flex items-center gap-2`}>
          <FaMessage className={
              isActive('/dashboard/reportBug') ? `text-2xl text-blue-500` : ` text-2xl text-gray-600`
            } />
          <Link
            href={"/dashboard/reportBug"}
            className={
              isActive("/dashboard/reportBug")
                ? `text-blue-500 cursor-pointer`
                : `cursor-pointer text-gray-600`
            }
          >
            {" "}
            Report Bug
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
