"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const EditProfileUsers = ({ id, phone, bio, email, username }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [newPhone, setNewPhone] = useState(phone);
  const [newEmail, setNewEmail] = useState(email);
  const [newBio, setNewBio] = useState(bio);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/editProfile/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ newUsername, newEmail, newBio, newPhone }),
      });
      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to update user!!");
      }
      router.refresh();
      toast.success("User updated successfully! ");
      router.push("/clientsProductsPage");
    } catch (error) {
      console.log(error);
      setLoading(false);
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
              <div className=" mt-3">
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="text-white bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
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
                    Updating user...
                  </button>
                ) : (
                  <button
                    className=" text-white bg-blue-600 px-2 py-1 rounded-md"
                    type="submit"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileUsers;
