import { Spinner } from "@/components/spinner";
import dynamic from "next/dynamic";
import React from "react";

type Props = {};
const InstructorDashboard = dynamic(
  () => import("@/components/dashboard/instructor-dashboard"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const Dashboard = (props: Props) => {
  return (
    <div>
      <InstructorDashboard />
    </div>
  );
};

export default Dashboard;
