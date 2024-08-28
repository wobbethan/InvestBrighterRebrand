"use client";
import { Label } from "@/components/ui/label";
import React from "react";
import { FieldValues, useFormContext, UseFormRegister } from "react-hook-form";
import { client } from "../../../lib/prisma";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { $Enums } from "@prisma/client";
import { useAuthContextHook } from "@/context/use-auth-context";

type Props = {
  value: string;
  title: string;
  text: string;
  register: UseFormRegister<FieldValues>;
  userType: $Enums.AccountTypes;
  setUserType: React.Dispatch<React.SetStateAction<$Enums.AccountTypes>>;
  numSteps: number;
};

const UserTypeCard = ({
  register,
  setUserType,
  text,
  title,
  userType,
  value,
  numSteps,
}: Props) => {
  const { setNumSteps, setType } = useAuthContextHook();
  return (
    <Label htmlFor={value}>
      <Card
        className={cn(
          "w-full cursor-pointer",
          userType == value && "border-IBblue"
        )}
        onClick={() => setNumSteps(numSteps)}
      >
        <CardContent className="flex justify-between p-2">
          <div className="flex items-center gap-3">
            <Card
              className={cn(
                "flex justify-center p-3",
                userType == value && "border-IBblue"
              )}
            >
              <User
                size={30}
                className={cn(
                  userType == value ? "text-IBblue" : "text-gray-400"
                )}
              ></User>
            </Card>
            <div className="">
              <CardDescription className="text-black">{title}</CardDescription>
              <CardDescription className="text-gray-400">
                {text}
              </CardDescription>
            </div>
          </div>
          <div className="">
            <div
              className={cn(
                "w-4 h-4 rounded-full",
                userType == value ? "bg-IBblue" : "bg-transparent"
              )}
            >
              <Input
                {...register("type", {
                  onChange: (event) => {
                    setUserType(event.target.value);
                    setType(event.target.value);
                  },
                })}
                value={value}
                id={value}
                className="hidden"
                type="radio"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Label>
  );
};

export default UserTypeCard;
