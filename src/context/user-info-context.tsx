"use client";
import React, { createContext, useState, useEffect } from "react";
import { User, $Enums, Section, Company } from "@prisma/client";
import { useUser } from "@clerk/clerk-react";
import { onGetUserInfo } from "@/actions/user/user";
import { onGetAccountCompany } from "@/actions/entity";

type UserContextType = {
  user: User;
};

const defaultUser: UserContextType = {
  user: {
    id: "",
    fullName: "",
    clerkId: "",
    type: $Enums.AccountTypes.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
    balance: 0,
    image: null,
    sponsored: null,
    sectionId: null,
    companyRole: null,
    companyId: null,
  },
};

export const UserContext = createContext<UserContextType>(defaultUser);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser.user);
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const userInfoRetrieval = async () => {
      if (isLoaded && isSignedIn) {
        const loggedInUser = await onGetUserInfo();

        if (loggedInUser !== undefined) {
          setUser(loggedInUser.user);
        }
      }
    };

    userInfoRetrieval();
  }, [isLoaded, isSignedIn]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUserContextHook = () => {
  return React.useContext(UserContext);
};
