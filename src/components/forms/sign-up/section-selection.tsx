"use client";
import { onGetSection } from "@/actions/entity";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

const SectionSelect = (props: Props) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [invite, setInvite] = useState<boolean>(false);
  const [classCode, setClassCode] = useState<string | undefined>("");
  const [avatar, setAvatar] = useState<string | undefined>("");
  const [sectionName, setSectionName] = useState<string | undefined>("");
  useEffect(() => {
    setLoading(true);
    setClassCode(pathName.split("/").pop());
    classCode ? setInvite(true) : setInvite(false);
    setLoading(false);
  }, [pathName]);

  const sectionInfo = async (id: string) => {
    try {
      const section = await onGetSection(id);
      setSectionName(section.section?.name);
      setAvatar(section.section?.image);
    } catch (error) {
      setInvite(false);
    }
  };

  useEffect(() => {
    sectionInfo(classCode!);
  }, [classCode]);

  return (
    <div>
      {invite ? (
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="font-bold text-xl text-center">
            You are about to join
          </h1>
          <div className="h-[250px] rounded-2xl flex items-center flex-col justify-center shadow-lg mb-5 gap-5 p-10">
            <Image
              src={`https://ucarecdn.com/${avatar}/`}
              alt="section avatar"
              width={200}
              height={200}
            />
            <h1 className="font-bold text-2xl text-center">{sectionName}</h1>
          </div>
        </div>
      ) : (
        <div className="h-[250px] rounded-2xl flex items-center flex-col justify-center shadow-lg mb-5 gap-5 p-10">
          No fucking section
        </div>
      )}
    </div>
  );
};

export default SectionSelect;
