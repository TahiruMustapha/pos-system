"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileDetails = () => {
  const { data: session } = useSession();
  return (
    <div className=" w-full h-full">
      <h2 className=" text-3xl text-gray-500 mt-3"> Your Profile</h2>

      <div className=" flex mt-3 rounded-sm  gap-4 px-2 py-2 w-[50%] bg-white shadow-md">
        <div className=" border-gray-300 border-[1px] px-2 py-2 rounded-md w-[30%] h-fit">
          <FaUserCircle className=" w-full text-9xl text-gray-400" />
        </div>
        <div>
          <p className="  border-b-gray-300 border-b-[1px] text-gray-600 font-semibold">
            {" "}
            Username:{" "}
            <span className=" font-normal text-gray-500">
              {session?.user.username}
            </span>{" "}
          </p>
          <p className=" mt-4 border-b-gray-300 border-b-[1px] text-gray-600 font-semibold">
            {" "}
            Email:{" "}
            <span className=" font-normal text-orange-600">
              {session?.user?.email}
            </span>{" "}
          </p>
          <p className=" mt-4 border-b-gray-300 border-b-[1px] text-gray-600 font-semibold">
            {" "}
            Phone:{" "}
            <span className=" font-normal text-gray-500">
              {session?.user?.phone}
            </span>{" "}
          </p>
          <p className=" mt-4 border-b-gray-300 border-b-[1px] text-gray-600 font-semibold">
            {" "}
            Bio:{" "}
            <span className=" font-normal text-gray-500">
              {session?.user?.bio}
            </span>{" "}
          </p>
          <Link className=" " href={`/dashboard/editProfile/${session?.user?._id}`}>
            <button className=" bg-blue-700 mt-4 text-white px-3 cursor-pointer rounded-md py-2">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
