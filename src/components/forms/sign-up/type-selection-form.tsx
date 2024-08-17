import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import UserTypeCard from "./user-type-card";
import { $Enums } from "@prisma/client";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: $Enums.AccountTypes;
  setUserType: React.Dispatch<React.SetStateAction<$Enums.AccountTypes>>;
};

const TypeSelectionForm = ({ register, userType, setUserType }: Props) => {
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Create an account</h2>
      <p className="text-iridium md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value={$Enums.AccountTypes.STUDENT}
        title="I am a Student"
        text="Participating in a classroom activity"
        numSteps={4}
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value={$Enums.AccountTypes.INSTRUCTOR}
        title="I am a Teacher"
        text="Conducting my class on InvestBrighter"
        numSteps={3}
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value={$Enums.AccountTypes.INVESTOR}
        title="I am an Entrepreneur"
        text="Looking for my next venture"
        numSteps={2}
      />
    </>
  );
};

export default TypeSelectionForm;
