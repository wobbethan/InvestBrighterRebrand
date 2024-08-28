import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-3">
      <h1 className="text-2xl font-bold">Join a class</h1>
      <p>
        All students must join a section, please paste the join link provided by
        your instructor into the url above
      </p>
    </div>
  );
};

export default page;
