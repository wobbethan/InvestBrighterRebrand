import { onLoginUser } from "@/actions/auth/auth";
import SideBar from "@/components/sidebar/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="w-full h-screen flex flex-col py-3 pr-10 pl-20 md:px-10">
        {children}
      </div>
    </div>
  );
};

export default OwnerLayout;
