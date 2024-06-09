"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  // const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [userType, setUserType] = useState(""); // Default role
  const [secretKey, setSecretKey] = useState(""); // Default role

  const handleSubmit = async (e) => {
    if (userType === "Admin" && secretKey !== "Tahiru") {
      e.preventDefault();
      toast.error("Invalid secret key!!");
    }else{
      e.preventDefault();
      setLoading(true);
      if (!username || !password || !email || !phone || !bio ) {
        setError("All fields are necessary!");
        return;
      }
  
      try {
        // const resUserExist = await fetch("api/userExist", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ username }),
        // });
        // const { user } = await resUserExist.json();
        // if (user) {
        //   setError("User already exist!");
        //   return;
        //   console.log(user);
        // }
        const res = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
            phone,
            bio,
            userType,
          }),
        });
  
        if (res.ok) {
          const formBox = e.target;
          formBox.reset();
          toast.success("User registered successfully! ");
          setLoading(false);
          router.push("/login");
        } else {
          console.log("user registeration failed!");
        }
      } catch (error) {
        setLoading(false);
        console.log("Error during registeration!", error);
      }
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
          <div className=" mt-3 ">
            <input
              type="radio"
              name="userType"
              value={"User"}
              onChange={(e) => setUserType(e.target.value)}
            />
            User{" "}
            <input
              type="radio"
              name="userType"
              value={"Admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className=" mt-3">
              <input
                onChange={(e) => setSecretKey(e.target.value)}
                className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
                type="text"
                placeholder="secret key"
              />
            </div>
          ) : null}

          {loading ? (
            <button
              disabled
              type="submit"
              className=" text-white flex items-center justify-center  bg-blue-600 w-full mt-3 px-2 py-1 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Registering user...
            </button>
          ) : (
            <button
              className=" text-white bg-blue-600 w-full mt-3 px-2 py-1 rounded-md"
              type="submit"
            >
              Register
            </button>
          )}

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
