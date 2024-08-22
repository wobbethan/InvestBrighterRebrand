import { useUserContextHook } from "@/context/user-info-context";
import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Loader from "../loader";

type Props = {
  min?: boolean;
};

const student = $Enums.AccountTypes.STUDENT;
const instructor = $Enums.AccountTypes.INSTRUCTOR;
const investor = $Enums.AccountTypes.INVESTOR;

const EntityList = ({ min }: Props) => {
  const { user, company, section, sections, loading } = useUserContextHook();
  return (
    <div className="flex flex-col gap-1 text-ironside font-medium">
      {user.type === student && company ? (
        <div>
          <Link
            href={`/settings/company/${company.name}`}
            key={user.companyId}
            className={cn(
              "flex gap-3 items-center hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer ",
              !min ? "p-2 " : "py-2 justify-center"
            )}
          >
            <Image
              src={`https://ucarecdn.com/${company.image}/`}
              alt="logo"
              width={20}
              height={20}
            />
            {!min && <span className="text-sm">{company.name}</span>}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-1 text-ironside font-medium">
          {sections &&
            sections.map((section) => (
              <Link
                href={`/settings/section/${section.id}`}
                key={section.id}
                className={cn(
                  "flex gap-3 items-center hover:bg-white rounded-full transition duration-100 ease-in-out cursor-pointer ",
                  !min ? "p-2 " : "py-2 justify-center"
                )}
              >
                <Image
                  src={`https://ucarecdn.com/${section.image}/`}
                  alt="logo"
                  width={20}
                  height={20}
                />
                {!min && <span className="text-sm">{section.name}</span>}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default EntityList;
