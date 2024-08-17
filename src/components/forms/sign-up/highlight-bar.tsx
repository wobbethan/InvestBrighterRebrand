"use client";
import { useAuthContextHook } from "@/context/use-auth-context";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const HighlightBar = (props: Props) => {
  const { currentStep, numSteps } = useAuthContextHook();
  return (
    <div className={`grid grid-cols-${numSteps} gap-3`}>
      {Array.from({ length: numSteps }, (_, index) => (
        <Bar key={index} active={index < currentStep} />
      ))}
    </div>
  );
};

const Bar = ({ active }: { active: boolean }) => {
  return (
    <div
      className={cn(
        "rounded-full h-2 col-span-1",
        active ? "bg-orange" : "bg-gray-300"
      )}
    />
  );
};

export default HighlightBar;
