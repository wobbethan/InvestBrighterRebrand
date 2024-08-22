import {
  INSTRUCTOR_SIDE_BAR_MENU,
  STUDENT_SIDE_BAR_MENU,
} from "@/constants/menu";
import { useUserContextHook } from "@/context/user-info-context";
import { $Enums } from "@prisma/client";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import EntityMenu from "./entity-menu";
import MenuItem from "./menu-item";
import Link from "next/link";
import SettingsIcon from "@/icons/settings-icon";

type Props = {
  current: string;
  onExpand(): void;
  onSignOut(): void;
};

const MaxMenu = ({ current, onExpand, onSignOut }: Props) => {
  const { user } = useUserContextHook();
  let SIDE_BAR_MENU = STUDENT_SIDE_BAR_MENU;
  if (user.type === $Enums.AccountTypes.INSTRUCTOR) {
    SIDE_BAR_MENU = INSTRUCTOR_SIDE_BAR_MENU;
  } else if (user.type === $Enums.AccountTypes.INVESTOR) {
    SIDE_BAR_MENU = STUDENT_SIDE_BAR_MENU;
  }
  return (
    <div className="py-3 px-4 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          className="animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          style={{
            width: "50%",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        <Menu
          className="cursor-pointer animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          onClick={onExpand}
        />
      </div>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">MENU</p>
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="max" {...menu} key={key} current={current} />
          ))}
          <EntityMenu />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">OPTIONS</p>
          <MenuItem size="max" label="Settings" icon={<SettingsIcon />} />

          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};

export default MaxMenu;
