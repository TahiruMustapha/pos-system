"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  //   console.log("pathname", pathName);
  //   console.log("searchParams", searchParams);
  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);
   
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  };
  return (
    <div className=" flex px-1 py-1 rounded-md bg-white border-gray-300 border-[1px] items-center gap-1">
      <CiSearch className=" text-xl font-bold" />
      <input
        className=" bg-transparent outline-none"
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
