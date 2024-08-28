import { useUserContextHook } from "@/context/user-info-context";
import { cn } from "@/lib/utils";
import { $Enums } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Loader from "../loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        <TooltipProvider key={company.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/settings/company/${company.name}`}
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
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{company.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="flex flex-col gap-1 text-ironside font-medium">
          {sections &&
            sections.map((section) => (
              <TooltipProvider key={section.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/settings/section/${section.id}`}
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
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{section.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
      )}
    </div>
  );
};

export default EntityList;
