"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const SectionSelect = (props: Props) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [invite, setInvite] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const classCode = pathName.split("=").pop();
    classCode ? setInvite(true) : setInvite(false);
    setLoading(false);
  }, [pathName]);
  return <div>sectionSelect</div>;
};

export default SectionSelect;
