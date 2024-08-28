"use client";
import React, { useState } from "react";
import { $Enums } from "@prisma/client";

type InitialValueProps = {
  numSteps: number;
  currentStep: number;
  type: $Enums.AccountTypes;

  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setNumSteps: React.Dispatch<React.SetStateAction<number>>;
  setType: React.Dispatch<React.SetStateAction<$Enums.AccountTypes>>;
};

const InitialValues: InitialValueProps = {
  numSteps: 4,
  currentStep: 1,
  type: $Enums.AccountTypes.STUDENT,
  setCurrentStep: () => undefined,
  setNumSteps: () => undefined,
  setType: () => undefined,
};

const authContext = React.createContext(InitialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    InitialValues.currentStep
  );
  const [numSteps, setNumSteps] = useState<number>(InitialValues.numSteps);
  const [type, setType] = useState<$Enums.AccountTypes>(InitialValues.type);
  const values = {
    numSteps,
    currentStep,
    type,
    setCurrentStep,
    setNumSteps,
    setType,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
