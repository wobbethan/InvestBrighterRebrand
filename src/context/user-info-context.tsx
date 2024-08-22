"use client";
import React, { createContext, useState, useEffect } from "react";
import { User, $Enums, Section, Company } from "@prisma/client";
import { useUser } from "@clerk/clerk-react";
import { onGetUserInfo } from "@/actions/user/user";
import {
  onGetAccountCompany,
  onGetAllAccountSections,
  onGetSection,
} from "@/actions/entity";
import { useRouter } from "next/navigation";

type UserContextType = {
  user: User;
  company: Company | null;
  section: Section | null;
  sections: Section[] | null;
  loading: boolean;
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
  company: null,
  section: null,
  sections: null,
  loading: false,
};

export const UserContext = createContext<UserContextType>(defaultUser);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser.user);
  const { isLoaded, isSignedIn } = useUser();
  const [company, setCompany] = useState<Company | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const userInfoRetrieval = async () => {
    if (isLoaded && isSignedIn) {
      setLoading(true);
      const loggedInUser = await onGetUserInfo();

      //Set user information
      if (loggedInUser !== undefined) {
        setUser(loggedInUser.user);
      }

      //Set associated Company and section if student
      if (loggedInUser?.user.type === $Enums.AccountTypes.STUDENT) {
        if (loggedInUser?.user.companyId) {
          const userCompany = await onGetAccountCompany();
          if (userCompany?.company) {
            setCompany(userCompany?.company);
          }
        }

        if (loggedInUser.user.sectionId) {
          const returnedSection = await onGetSection(
            loggedInUser.user.sectionId
          );
          if (returnedSection?.section) {
            setSection(returnedSection?.section);
          }
        }
      }
      //Get all sections for instructor
      else if (loggedInUser?.user.type === $Enums.AccountTypes.INSTRUCTOR) {
        const userSections = await onGetAllAccountSections();
        if (userSections?.sections?.sections) {
          setSections(userSections?.sections?.sections);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    userInfoRetrieval();
  }, [isLoaded, isSignedIn]);

  return (
    <UserContext.Provider value={{ user, company, section, sections, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContextHook = () => {
  return React.useContext(UserContext);
};
