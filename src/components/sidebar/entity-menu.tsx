// import { useEntity } from "@/hooks/sidebar/use-Entity";
import { cn } from "@/lib/utils";
import React from "react";
import AppDrawer from "../drawer";
import { Plus } from "lucide-react";
import Loader from "../loader";
import FormGenerator from "../forms/form-generator/index";
import { Button } from "../ui/button";
// import UploadButton from "../upload-button";
import Link from "next/link";
import Image from "next/image";
import { $Enums } from "@prisma/client";
import { useUserContextHook } from "@/context/user-info-context";

import { Spinner } from "../spinner";
import dynamic from "next/dynamic";
import EntityList from "./entity-list";

type Props = {
  min?: boolean;
};

const student = $Enums.AccountTypes.STUDENT;
const instructor = $Enums.AccountTypes.INSTRUCTOR;
const investor = $Enums.AccountTypes.INVESTOR;

const CreateCompanyForm = dynamic(
  () => import("../forms/create-company/create-company"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const CreateSectionForm = dynamic(
  () => import("../forms/create-section/create-section"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const EntityMenu = ({ min }: Props) => {
  const { user } = useUserContextHook();
  return (
    <div className={cn("flex flex-col gap-3", min ? "mt-6" : "mt-3")}>
      <div
        className={cn(
          "flex w-full items-center",
          min ? "justify-center" : "justify-between"
        )}
      >
        {!min && (
          <p className="text-sm text-gray-500">
            {user.type === student
              ? "Company"
              : user.type === instructor
              ? "Sections"
              : "Companies"}
          </p>
        )}
        {!user.companyId && (
          <AppDrawer
            title={
              user.type === student
                ? "Create Company"
                : user.type === instructor
                ? "Sections"
                : "Companies"
            }
            description={
              user.type === student
                ? "Enter your company's name and logo"
                : user.type === instructor
                ? "Sections"
                : "Companies"
            }
            onOpen={
              <div className="cursor-pointer text-gray-500 rounded-full border-2 flex justify-center items-center">
                <Plus />
              </div>
            }
          >
            <div className="min-h-[202px] flex w-full items-center justify-center">
              {user.type === student ? (
                <CreateCompanyForm />
              ) : user.type === instructor ? (
                <CreateSectionForm />
              ) : (
                "Investor"
              )}
            </div>
          </AppDrawer>
        )}
      </div>
      <EntityList min={min} />
    </div>
  );
};

export default EntityMenu;
