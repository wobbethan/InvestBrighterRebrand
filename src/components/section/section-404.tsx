"use client";
import React from "react";
import Lottie from "lottie-react";
import notFound from "@/icons/404.json";
type Props = {};

const SectionNotFound = (props: Props) => {
  return (
    <div className="w-full h-screen  flex justify-center items-center flex-col gap-5">
      <div className="w-[100px]">
        <Lottie animationData={notFound} loop />
      </div>
      <span className="text-3xl font-bold text-center">
        This section does not exist
      </span>
    </div>
  );
};

export default SectionNotFound;
