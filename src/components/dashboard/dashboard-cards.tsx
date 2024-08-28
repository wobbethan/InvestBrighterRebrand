import React from "react";

type Props = {
  type: string;
  data: number;
};

const DashboardCards = ({ type, data }: Props) => {
  return (
    <div className="rounded-2xl bg-platinum p-4 flex-1">
      <div>{data}</div>
      <div className="capitalize text-sm font-medium text-gray-500">
        {type}s
      </div>
    </div>
  );
};

export default DashboardCards;
