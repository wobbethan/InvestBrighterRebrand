import React from "react";
import DashboardCards from "./dashboard-cards";
import RadialBar from "./radial-bar";
import { onGetUserInfo } from "@/actions/user/user";

type Props = {};

const InstructorDashboard = async (props: Props) => {
  const user = (await onGetUserInfo())?.user;
  return (
    <div className="p-4 flex gap-4 md:flex-row flex-col">
      {/* Left */}

      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          {/* <DashboardCards type="section" />
          <DashboardCards type="student" />
          <DashboardCards type="company" />
          <DashboardCards type="investment" /> */}
        </div>
        {/* Middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <RadialBar />
          </div>
          {/* Attend chart */}
          <div className="w-full lg:w-2/3 h-[450px]"></div>
        </div>
        {/* Bottom charts */}
        <div className=""></div>
      </div>
      {/* Right */}
      <div className="w-full lg:w-1/3">r</div>
    </div>
  );
};

export default InstructorDashboard;
