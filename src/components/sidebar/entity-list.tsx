import { useUserContextHook } from "@/context/user-info-context";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { $Enums } from "@prisma/client";
import { useCompany } from "@/hooks/entity/use-entity";
import { cn } from "@/lib/utils";

type Props = {
  min?: boolean;
};

const student = $Enums.AccountTypes.STUDENT;
const instructor = $Enums.AccountTypes.INSTRUCTOR;
const investor = $Enums.AccountTypes.INVESTOR;

const EntityList = ({ min }: Props) => {
  const { user } = useUserContextHook();
  console.log(user);
  return (
    <div className="flex flex-col gap-1 text-ironside font-medium">
      {user.type === student && user.companyId ? (
        <Link
          href={`/settings/company/${user.type}`}
          key={user.companyId}
          className={cn(
            "flex gap-3 items-center hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer ",
            !min ? "p-2 " : "py-2 justify-center"
          )}
        >
          {/* <Image
            src={`https://ucarecdn.com/${user.company?.image}/`}
            alt="logo"
            width={20}
            height={20}
          /> */}
          {/* {!min && <span className="text-sm">{user}</span>} */}
        </Link>
      ) : (
        <></>
      )}
      {/* {Entitys &&
        Entitys.map((Entity) => (
          <Link
            href={`/settings/${Entity.name.split(".")[0]}`}
            key={Entity.id}
            className={cn(
              "flex gap-3 items-center hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer ",
              !min ? "p-2 " : "py-2 justify-center",
              Entity.name.split(".")[0] == isEntity && "bg-white"
            )}
          >
            <Image
              src={`https://ucarecdn.com/${Entity.icon}/`}
              alt="logo"
              width={20}
              height={20}
            />
            {!min && <span className="text-sm">{Entity.name}</span>}
          </Link>
        ))} */}
    </div>
  );
};

export default EntityList;
