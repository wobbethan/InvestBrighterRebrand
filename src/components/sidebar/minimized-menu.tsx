import {
  INSTRUCTOR_SIDE_BAR_MENU,
  SIDE_BAR_MENU_PROPS,
  STUDENT_SIDE_BAR_MENU,
} from "@/constants/menu";

import React, { useState } from "react";

import { LogOut, MonitorSmartphone } from "lucide-react";
import { MenuLogo } from "@/icons/menu-logo";
import MenuItem from "./menu-item";
import EntityMenu from "./entity-menu";
import { $Enums } from "@prisma/client";
import { useUserContextHook } from "@/context/user-info-context";
import Link from "next/link";
import SettingsIcon from "@/icons/settings-icon";

type MinMenuProps = {
  onShrink(): void;
  current: string;
  onSignOut(): void;
};

export const MinMenu = ({ onShrink, current, onSignOut }: MinMenuProps) => {
  const { user } = useUserContextHook();
  let SIDE_BAR_MENU = STUDENT_SIDE_BAR_MENU;
  if (user.type === $Enums.AccountTypes.INSTRUCTOR) {
    SIDE_BAR_MENU = INSTRUCTOR_SIDE_BAR_MENU;
  } else if (user.type === $Enums.AccountTypes.INVESTOR) {
    SIDE_BAR_MENU = STUDENT_SIDE_BAR_MENU;
  }
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}
          <EntityMenu min />
        </div>
        <div className="flex flex-col gap-0">
          <MenuItem size="min" label="Settings" icon={<SettingsIcon />} />
          <MenuItem
            size="min"
            label="Sign out"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </div>
  );
};
