"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

import { useClerk } from "@clerk/nextjs";

const useSideBar = () => {
  // const user =
  const [expand, setExpand] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  const page = pathname.split("/").pop();
  const { signOut } = useClerk();

  const onSignOut = () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    loading,
  };
};

export default useSideBar;
