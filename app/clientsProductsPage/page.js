"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SideBar from "../dashboard/SideBar";
import { LiaSearchSolid } from "react-icons/lia";
import { IoIosArrowRoundDown, IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCalendarMonth } from "react-icons/tb";
import { FcExpired } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { CiMoneyBill } from "react-icons/ci";
import { CgToday } from "react-icons/cg";
import SalesSideNavbar from "../../components/SalesSideNavbar";
import Link from "next/link";
import { Store } from "@/redux/store";
const page = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(true);
  const [yesterday, setYesterday] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(false);

  // const [dateTime, setDateTime] = useState(new Date());
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDateTime({
        date: now.toLocaleDateString(undefined, dateOptions),
        time: now.toLocaleTimeString(),
      });
    };
    updateDateTime();
    // Update time every second
    const timer = setInterval(updateDateTime, 1000);
    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.date;
  const formattedTime = dateTime.time;
  const [cartInfo, setCartInfo] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const storedDate = JSON.parse(localStorage.getItem("currentDate"));
    if (storedDate) {
      setCurrentDate(storedDate);
    }
  }, []);

  useEffect(() => {
    // Retrieve the cartData array from local storage
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItemsHistory")
    );
    if (storedCartItems) {
      setCartInfo(storedCartItems);
    }
  }, []);
  // console.log(typeof cartInfo);
  return (
    <div className="h-screen ">
      <div className=" w-full  h-full flex flex-row">
        <div className=" w-full  ">
          <div className=" h-full">
            <nav className=" flex items-center justify-between py-3 px-3">
              <div className=" border-gray-300 border-[1px] w-[40%] px-1 py-1 rounded-md flex items-center justify-between ">
                <p className=" flex items-center gap-2">
                  <LiaSearchSolid className=" text-2xl" />
                  <input
                    type="text"
                    className=" w-full outline-none border-none"
                    placeholder="Search Here"
                  />
                </p>
                <IoIosArrowRoundDown className=" text-2xl" />
              </div>
              <div className=" flex items-center gap-2">
                <IoSettingsOutline className=" cursor-pointer text-xl" />
                <IoIosNotificationsOutline className=" cursor-pointer text-xl" />
                <div className=" w-10 h-10 cursor-pointer rounded-full flex items-center justify-center bg-gray-300">
                  <Link href={"/clientsProductsPage/profile"}>
                    {" "}
                    <FaUserAlt className=" text-2xl" />
                  </Link>
                </div>
              </div>
            </nav>
            <div className="  bg-gray-100   py-2 ">
              <div className=" flex items-center justify-center gap-5 mt-3">
                <div className=" w-[45%] bg-white rounded-sm shadow-md px-2 py-2">
                  <div className=" w-full flex items-center gap-3 border-gray-200 border-b-[1px] ">
                    <p
                      onClick={() =>
                        setProfile(true) ||
                        setCurrentWeek(false) ||
                        setYesterday(false)
                      }
                      className={`${
                        profile
                          ? `cursor-pointer text-violet-800 border-violet-800 border-b-[2px] pb-1`
                          : ` cursor-pointer`
                      }`}
                    >
                      Profile
                    </p>
                    <p
                      onClick={() =>
                        setYesterday(true) ||
                        setProfile(false) ||
                        setCurrentWeek(false)
                      }
                      className={`${
                        yesterday
                          ? `cursor-pointer text-violet-800 border-violet-800 border-b-[2px] pb-1`
                          : ` cursor-pointer`
                      }`}
                    >
                      Yesterday
                    </p>
                    <p
                      onClick={() =>
                        setCurrentWeek(true) ||
                        setProfile(false) ||
                        setYesterday(false)
                      }
                      className={`${
                        currentWeek
                          ? `cursor-pointer text-violet-800 border-violet-800 border-b-[2px] pb-1`
                          : ` cursor-pointer`
                      }`}
                    >
                      Current week
                    </p>
                  </div>
                  {profile && (
                    <div className=" mt-1">
                      <h3 className=" text-xl font-semibold text-gray-600">
                        Welcome{" "}
                        <span className=" text-orange-600">
                          {session?.user.username}
                        </span>
                      </h3>
                      <p className=" text-gray-500">
                        You are logged in as{" "}
                        <span className=" text-red-600">Sales person</span>{" "}
                      </p>
                    </div>
                  )}
                  {yesterday && (
                    <div className=" mt-1">
                      <h3 className=" text-xl font-semibold text-gray-600">
                        Welcome{" "}
                        <span className=" text-orange-600">
                          {/* {session?.user.username} */}
                          Tahiru
                        </span>
                      </h3>
                      <p className=" text-gray-500">
                        You are logged in as{" "}
                        <span className=" text-red-600">Sales person</span>{" "}
                      </p>
                    </div>
                  )}
                  {currentWeek && (
                    <div className=" mt-1">
                      <h3 className=" text-xl font-semibold text-gray-600">
                        Welcome{" "}
                        <span className=" text-orange-600">
                          {/* {session?.user.username} */}
                          Salam
                        </span>
                      </h3>
                      <p className=" text-gray-500">
                        You are logged in as{" "}
                        <span className=" text-red-600">Sales person</span>{" "}
                      </p>
                    </div>
                  )}
                </div>
                <div className=" w-[45%] border-[#3ABEF9] border-[2px] text-center rounded-md bg-[#1A2130] shadow-md px-2 py-4">
                  <p className=" text-2xl text-white">{formattedDate} </p>
                  <p className=" text-4xl text-white">{formattedTime}</p>
                </div>
              </div>
              <div className=" w-[92%]   mx-auto  mt-6 flex justify-between gap-5 items-center">
                <div className=" flex flex-col text-white px-12 py-5 rounded-md items-center bg-[#FC4100]">
                  <CiMoneyBill className=" text-3xl" />
                  <p>Overall Total Sales</p>
                  <p>GH2309</p>
                </div>
                <div className="  flex flex-col text-white px-10 py-5 rounded-md items-center bg-[#050C9C]">
                  <CgToday className=" text-3xl" />
                  <p>Total Sales Today</p>
                  <p>GH230</p>
                </div>
                <div className=" bg-[#C40C0C] flex flex-col text-white px-10 py-5 rounded-md items-center ">
                  <FcExpired className=" text-3xl" />
                  <p>Expired Products</p>
                  <p>3</p>
                </div>
                <div className=" flex flex-col text-white px-10 py-5 rounded-md items-center bg-[#FF204E]">
                  <TbCalendarMonth className=" text-3xl" />
                  <p>Your Sales this Month</p>
                  <p>GH2309</p>
                </div>
              </div>
              <div className=" mt-6 w-[92%] mx-auto ">
                <div className=" w-full rounded-md shadow-md px-2 py-3 bg-white">
                  <p className=" text-red-500 font-semibold capitalize tracking-wide">
                    Your Sales log ({session?.user.username}){" "}
                  </p>
                  <div className=" flex items-center mt-3 justify-between">
                    <div className=" flex items-center gap-1">
                      <p>Show</p>
                      <input
                        type="number"
                        defaultValue={0}
                        className=" outline-none w-[50px] border-gray-300 border-[1px] px-1 py-1 rounded-sm"
                      />
                      <p>entries</p>
                    </div>
                    <div className=" flex items-center justify-center gap-1">
                      <p>Search:</p>
                      <input
                        type="text"
                        className=" outline-none border-gray-300 border-[1px] px-1 py-2 rounded-sm"
                      />
                    </div>
                  </div>
                  {cartInfo.length >= 1 ? (
                    <table className="mt-3 w-full  overflow-y-auto ">
                      <thead className=" border-b-blue-600 border-b-[2px] border-t-blue-600 border-t-[2px]">
                        <tr className="  ">
                          <th className=" p-3 text-sm text-gray-600">s/n</th>
                          <th className=" p-3 text-sm text-gray-600">
                            Product Name
                          </th>
                          <th className=" p-3 text-sm text-gray-600">
                            Quantity
                          </th>
                          <th className=" p-3 text-sm text-gray-600">
                            Unit Price
                          </th>
                          <th className=" p-3 text-sm text-gray-600">
                            Total Price
                          </th>
                          <th className=" p-3 text-sm text-gray-600">
                            Sale Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartInfo.map((product, index) => (
                          <tr
                            className=" border-b-black border-b-[2px] text-center"
                            key={product._id}
                          >
                            <td className=" p-3  font-semibold">{index}</td>
                            <td className=" p-3  font-semibold">
                              {product.productName}
                            </td>
                            <td className=" p-3  font-semibold">
                              {product.quantity}
                            </td>
                            <td className=" p-3  font-semibold">
                              GHS {product.productPrice}
                            </td>
                            <td className=" p-3  font-semibold">
                              GHS {product.quantity * product.productPrice}
                            </td>
                            <td className=" p-3  font-semibold">
                              {currentDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className=" mt-3  flex items-center justify-center text-gray-500 text-center">
                      You've made no sales today! {session?.user.username}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
