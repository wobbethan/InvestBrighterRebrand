"use client";
import { useAuthContextHook } from "@/context/use-auth-context";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

type Props = {};

const HighlightBar = (props: Props) => {
  const { currentStep, numSteps } = useAuthContextHook();
  return (
    <div
      className={clsx(
        `grid gap-3`,
        numSteps === 4 ? "grid-cols-4" : "grid-cols-3"
      )}
    >
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
        active ? "bg-IBgreen" : "bg-gray-300"
      )}
    />
  );
};

export default HighlightBar;
