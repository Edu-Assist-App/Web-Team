"use client";
import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col px-6 gap-4 min-h-screen items-center justify-center">
      <Image src={"/assets/pageNotFound.svg"} height={300} width={300} alt="" />
      <h2 className="xxs: text-lg md:text-3xl text-gray-500 dark:text-white">
        404 (page not found)
      </h2>
    </div>
  );
};

export default NotFound;
