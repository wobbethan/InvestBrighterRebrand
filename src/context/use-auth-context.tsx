"use client";
import React, { useState } from "react";

type InitialValueProps = {
  numSteps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setNumSteps: React.Dispatch<React.SetStateAction<number>>;
};

const InitialValues: InitialValueProps = {
  numSteps: 4,
  currentStep: 1,
  setCurrentStep: () => undefined,
  setNumSteps: () => undefined,
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
  const values = {
    numSteps,
    currentStep,
    setCurrentStep,
    setNumSteps,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
