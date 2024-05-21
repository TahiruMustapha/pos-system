"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Layout = () => {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    redirect("/");
  }
  return (
    <div className=" w-full h-screen bg-blue-800">
      <header className="  py-4">
        <nav className=" w-[80%] mx-auto flex items-center justify-between">
          <div className=" border-white border-[2px] w-8 h-8 flex items-center justify-center rounded-full">
            <h2 className=" text-white font-semibold text-xl">
              {" "}
              <Link href={"/"}>P</Link>{" "}
            </h2>
          </div>

          <div className="text-white  flex items-center gap-4">
            {session && <p> Welcome {session?.user?.username}  </p>}
            <Link
              className=" hover:bg-blue-500 rounded-md duration-200 px-2 py-2 "
              href={"/login"}
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className=" hover:bg-blue-500 rounded-md duration-200 px-2 py-2 "
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
      <div className="w-[80%] mx-auto flex items-center">
        <div className=" flex-1">
          <h2 className=" capitalize mb-3 text-white font-semibold text-3xl">
            Inventory & stock <br /> management <br /> solution
          </h2>
          <p className=" text-white text-xl mb-3">
            Inventory sytem to support and manage products in the pharmacy in
            real tim and integrated to make it easier to develop your business.
          </p>
          <p className=" border-white border-[2px] inline-block text-white font-semibold rounded-md capitalize mt-3 px-3 py-2">
            Free Trial 1 month
          </p>
          <div className=" flex gap-3 items-center text-white mt-4">
            <div>
              <h2 className=" font-semibold text-3xl">14k</h2>
              <p>Brand Owners</p>
            </div>
            <div>
              <h2 className=" font-semibold text-3xl">23k</h2>
              <p>Active Users</p>
            </div>
            <div>
              <h2 className=" font-semibold text-3xl">500+</h2>
              <p>Partners</p>
            </div>
          </div>
        </div>
        <div className=" flex-2">
          <img src="/inv-img.png" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
