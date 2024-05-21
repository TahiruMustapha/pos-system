"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid credentials!");
        return;
      }
      router.replace("/dashboard" );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-gray-200 flex items-center justify-center w-full h-screen">
      <div className=" bg-white w-[350px] px-4 py-4 rounded-md shadow-md ">
        <div className=" w-full flex flex-col items-center">
          <IoLogInOutline className=" text-5xl text-gray-400" />
          <h2 className=" text-3xl text-orange-600 font-semibold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" mt-3">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className=" w-full outline-none placeholder: text-sm py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="text"
              placeholder="Enter Username"
            />
          </div>
          <div className=" mt-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          <button
            className=" bg-blue-600 mt-3 rounded-sm w-full py-1 text-white"
            type="submit"
          >
            Login
          </button>
          {error && <p className=" text-red-600  mt-3">{error}</p>}
        </form>
        <div className=" text-xs mt-3 w-full flex items-center justify-between">
          <Link className=" text-blue-600" href={"#"}>
            Forgot Password
          </Link>
          <p className=" text-gray-500">
            Don't have an account?{" "}
            <Link className=" text-blue-600" href={"/register"}>
              Register
            </Link>
          </p>
        </div>
        {/* <Link href={'/'} className=' mt-3 w-full flex items-center text-gray-400 text-xs' > <IoMdHome className=' text-lg' />Home</Link> */}
      </div>
    </div>
  );
};

export default login;
