"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const EditProfile = ({ id, phone, bio, email, username }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);
  const [newBio, setNewBio] = useState(bio);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/editProfile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ newUsername, newEmail, newBio, newPhone }),
      });
      if (!res.ok) {
        throw new Error("Failed to update user!!");
      }
      router.refresh();
      toast.success("User updated successfully! ");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className=" w-full h-full">
        <h2 className=" text-3xl text-gray-500 mt-3">Edit Profile</h2>
        <div className=" flex mt-3 rounded-sm  gap-4 px-2 py-2 w-[50%] bg-white shadow-md">
          <div className=" border-gray-300 border-[1px] px-2 py-2 rounded-md w-[30%] h-fit">
            <FaUserCircle className=" w-full text-9xl text-gray-400" />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className=" mt-3">
                <input
                  className=" w-full outline-none placeholder: text-sm py-2 shadow-md bg-blue-50 px-2 rounded-sm"
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setNewUsername(e.target.value)}
                  value={newUsername}
                />
              </div>

              <div className=" mt-3">
                <input
                  className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setNewEmail(e.target.value)}
                  value={newEmail}
                />
              </div>
              <div className=" mt-3">
                <input
                  className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
                  type="tel"
                  placeholder="Enter phone"
                  onChange={(e) => setNewPhone(e.target.value)}
                  value={newPhone}
                />
              </div>
              <div className=" mt-3">
                <input
                  className=" w-full placeholder: text-sm outline-none py-2 shadow-md bg-blue-50 px-2 rounded-sm"
                  type="text"
                  placeholder="Enter bio"
                  onChange={(e) => setNewBio(e.target.value)}
                  value={newBio}
                />
              </div>

              <button
                className=" bg-blue-600 mt-3 rounded-sm w-full py-1 text-white"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
