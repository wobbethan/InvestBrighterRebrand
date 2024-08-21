import { onLoginUser } from "@/actions/auth/auth";
import SideBar from "@/components/sidebar/sidebar";
import { UserProvider, useUserContextHook } from "@/context/user-info-context";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const authenticated = await onLoginUser();
  if (!authenticated) return null;
  return (
    <UserProvider>
      <div className="flex h-screen w-full">
        <SideBar />
        <div className="w-full h-screen flex flex-col py-3 pr-10 pl-20 md:px-10">
          {children}
        </div>
      </div>
    </UserProvider>
  );
};

export default Layout;
