"use client";
import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/auth/sign-up/use-sign-up";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormContext, useForm } from "react-hook-form";
import { $Enums } from "@prisma/client";
import Loader from "@/components/loader";

type Props = {};

const ButtonHandlers = (props: Props) => {
  const { currentStep, setCurrentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();

  const { onGenerateOTP, loading } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  const [signIn, setSignIn] = useState<string>("/sign-in");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const redirectUrl = query.get("redirect_url");
    if (redirectUrl) {
      setSignIn(`/sign-in?redirect_url=${encodeURIComponent(redirectUrl)}`);
    }
  }, []);

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button className="w-full" type="submit" disabled={loading}>
          <Loader loading={loading}>Create an account</Loader>
        </Button>
        <p>
          Already have an account?{" "}
          <Link href={signIn} className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }
  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () =>
                onGenerateOTP(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep
                ),
            })}
        >
          <Loader loading={loading}>Send Verification</Loader>
        </Button>
        <p>
          Already have an account?{" "}
          <Link href={signIn} className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="submit"
        className="w-full"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
        disabled={loading}
      >
        <Loader loading={loading}>Continue</Loader>
      </Button>
      <p>
        Already have an account?{" "}
        <Link href={signIn} className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandlers;
