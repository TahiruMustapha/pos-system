"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { useRouter } from "next/navigation";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !phone || !bio) {
      setError("All fields are necessary!");
      return;
    }

    try {
      const resUserExist = await fetch("api/userExist", {
        method: "POST",
        headers: {    
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const { user  } = await resUserExist.json();
      console.log(user)
      if (user) {
        setError("User already exist!");
        return; 
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          phone,
          bio
        }),
      });

      if (res.ok) {
        const formBox = e.target;
        formBox.reset();

        router.push("/login");
      } else {
        console.log("user registeration failed!");
      }
    } catch (error) {
      console.log("Error during registeration!", error);
    }
  };
  return (
    <div className=" bg-gray-200 flex items-center justify-center w-full h-screen">
      <div className=" bg-white w-[350px] px-4 py-4 rounded-md shadow-md ">
        <div className=" w-full flex flex-col items-center">
          <IoLogInOutline className=" text-5xl text-gray-400" />
          <h2 className=" text-3xl text-orange-600 font-semibold">Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" mt-3">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className=" w-full outline-none placeholder: text-sm py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="text"
              placeholder="Enter username"
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
          <div className=" mt-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className=" mt-3">
            <input
              onChange={(e) => setPhone(e.target.value)}
              className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="tel"
              placeholder="Enter phone"
            />
          </div>
          <div className=" mt-3">
            <input
              onChange={(e) => setBio(e.target.value)}
              className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
              type="text"
              placeholder="Enter bio"
            />
          </div>

          <button
            className=" bg-blue-600 mt-3 rounded-sm w-full py-1 text-white"
            type="submit"
          >
            Register
          </button>
          {error && <p className=" text-red-600  mt-3">{error}</p>}
        </form>
        <div className=" text-xs mt-3 w-full flex items-center justify-center">
          <p className=" text-gray-500">
            Already have an account?{" "}
            <Link className=" text-blue-600" href={"/login"}>
              Login
            </Link>
          </p>
        </div>
        {/* <Link href={'/'} className=' w-full flex items-center text-gray-400 text-xs' > <IoMdHome className=' text-lg' />Home</Link> */}
      </div>
    </div>
  );
};

export default login;
