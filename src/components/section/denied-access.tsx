"use client";
import Lottie from "lottie-react";
import React from "react";
import locked from "@/icons/locked.json";
type Props = {};

const AccessDenied = (props: Props) => {
  return (
    <div className="w-full h-screen  flex justify-center items-center flex-col gap-1">
      <div className="w-[200px]">
        <Lottie animationData={locked} loop={true} />
      </div>
      <span className="text-3xl font-extrabold text-center">Access Denied</span>
    </div>
  );
};

export default AccessDenied;
