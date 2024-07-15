import { fetchProducts } from "@/app/api/fetchProduct/route";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import DeleteUser from "./DeleteUser";
import { BsCart4 } from "react-icons/bs";
import { FaUser, FaUsers } from "react-icons/fa6";

const Users = ({ users }) => {
  // console.log(users)
  // Calculate the number of unique categories
  const userType = new Set(users.map((user) => user.userType === "Admin"));
  const uniqueUserType = userType.size;
  const adminUsers = users.userType === "Admin";
  const totalUsers = users.length;
  // console.log(adminUsers)
  const userCounts = users.reduce((counts, user) => {
    if (user.userType === 'Admin') {
      counts.admins += 1;
    } else if (user.userType === 'User') {
      counts.users += 1;
    }
    return counts;
  }, { admins: 0, users: 0 });
  return (
    <div className=" mt-3">
      <div>
        <div className=" flex items-center gap-2">
          <div className=" px-5 py-3 w-[200px] bg-[#071952]">
            <div className=" w-full flex gap-3 items-center">
              <FaUsers className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">Total Users</p>
                <p>{totalUsers}</p>
              </div>
            </div>
          </div>
          <div className=" px-5 py-3 w-[200px] bg-[#0766AD]">
            <div className=" w-full flex gap-3 items-center">
              <FaUsers className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm">Admin Users</p>
                <p>{userCounts.admins}</p>
              </div>
            </div>
          </div>
          <div className=" px-5 py-3 w-[200px] bg-[#B80000]">
            <div className=" w-full flex gap-3 items-center">
              <FaUsers className=" text-3xl text-white" />
              <div className=" flex text-white flex-col">
                <p className=" text-sm"> Sales Users</p>
                <p>{userCounts.users}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}

        <table className=" mt-3 w-full  overflow-y-auto ">
          <thead className=" border-b-blue-600 border-b-[2px] border-t-blue-600 border-t-[2px]">
            <tr className="  ">
              <th className=" p-3 text-sm text-gray-600">s/n</th>
              <th className=" p-3 text-sm text-gray-600">UserType</th>
              <th className=" p-3 text-sm text-gray-600">Username</th>
              <th className=" p-3 text-sm text-gray-600">Email</th>
              <th className=" p-3 text-sm text-gray-600">Phone</th>
              <th className=" p-3 text-sm text-gray-600">Bio</th>
              <th className=" p-3 text-sm text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className=" bg-white  my-1 border-b-gray-500 border-[1px] text-center  "
              >
                <td className=" p-3  ">{index + 1}</td>
                <td className=" p-3 ">{user.userType}</td>
                <td className=" p-3 ">{user.username}</td>
                <td className=" p-3 ">{user.email}</td>
                <td className=" p-3 ">{user.phone}</td>
                <td className=" p-3 ">{user.bio}</td>
                <td className=" flex items-center justify-center gap-2 p-3 ">
                  <Link href={`/dashboard/editProfile/${user?._id}`}>
                    <FaEdit className=" text-green-500 text-xl cursor-pointer" />
                  </Link>
                  {/* <DeleteBtn id = {user._id.toString()}/> */}
                  <DeleteUser id={user._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Table */}
      </div>
    </div>
  );
};

export default Users;
