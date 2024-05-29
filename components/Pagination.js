"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const page = searchParams.get("page") || 1;
  const params = new URLSearchParams(searchParams);

  const ITEM_PER_PAGE = 2;
  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChange = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathName}?${params}`);
  };
  return (
    <div className=" w-full mt-3 flex items-center gap-2 justify-center">
      <button
        onClick={() => handleChange("prev")}
        disabled={!hasPrev}
        className=" px-2 py-2 rounded-md flex  items-center border-gray-400 border-[1px]"
      >
        <IoIosArrowBack className=" text-xl" /> Prev
      </button>
      <p className="border-gray-400 px-3 py-2 rounded-md bg-blue-800 text-white border-[1px]">
        1
      </p>
      <p className="border-gray-400  px-3 py-2 rounded-md border-[1px]">2</p>
      <button
        onClick={() => handleChange("next ")}
        disabled={!hasNext}
        className=" px-2 py-2 rounded-md cursor-pointer flex items-center border-gray-400 border-[1px]"
      >
        Next
        <IoIosArrowForward className=" text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
