"use client";
import Link from "next/link";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { FaChartColumn } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardInfo from "../../components/DashboardInfo";
import AddProduct from "@/components/AddProduct";
import ReportBug from "@/components/ReportBug";

const page = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [reportBug, setReportBug] = useState(false);
  const [active, setActive] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className=" w-full h-screen">
      <div className="w-full flex   h-full">
        <div className=" w-[19%] ">
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
              className={`${
                active ? `text-2xl text-blue-500` : `text-2xl text-gray-600`
              }`}
            />
            <p
              onClick={() =>
                setDashboard(true) ||
                setAddProduct(false) ||
                setReportBug(false)
              }
              className={`text-blue-500 cursor-pointer `}
            >
              {" "}
              Dashboard
            </p>
          </div>
          <div className=" w-full px-4 py-3 border-gray-200 border-b-[2px]    flex items-center gap-2">
            <BiImageAdd className={` text-2xl text-gray-600`} />
            <p
              onClick={() =>
                setAddProduct(true) ||
                setDashboard(false) ||
                setReportBug(false)
              }
              className={`cursor-pointer text-gray-600`}
            >
              {" "}
              Add Product
            </p>
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
                <p className=" border-gray-200 cursor-pointer border-[2px] py-2 px-2 rounded-md text-gray-600">
                  Profile
                </p>
                <p className=" border-gray-200 cursor-pointer border-[2px] py-2 px-2 rounded-md text-gray-600">
                  Edit Profile
                </p>
              </div>
            )}
          </div>

          <div className=" w-full px-4 py-3 border-gray-200 border-b-[2px]    flex items-center gap-2">
            <FaMessage className=" text-2xl text-gray-600" />
            <p
              onClick={() =>
                setReportBug(true) ||
                setAddProduct(false) ||
                setDashboard(false)
              }
              className=" cursor-pointer text-gray-600"
            >
              {" "}
              Report Bug
            </p>
          </div>
        </div>
        <div className=" flex-1 px-4 bg-gray-100 h-fit ">
          {/* //dashboard nav */}
          <div className=" flex items-center  justify-between  py-4 border-gray-300 border-b-[1px]">
            <p className="  text-xl font-thin">
              Welcome,{" "}
              <span className=" text-orange-600 text-xl font-semibold">
                {session?.user?.username}
              </span>{" "}
            </p>
            <button
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/"); // Redirect to the dashboard page after signing out
                });
              }}
              className=" bg-orange-600 text-white px-2 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
          {/* //dashboard nav */}
          {dashboard && <DashboardInfo />}
          {addProduct && <AddProduct />}
          {reportBug && <ReportBug />}
        </div>
      </div>
    </div>
  );
};

export default page;
