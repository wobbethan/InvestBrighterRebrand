"use client";
import SignInFormProvider from "@/components/forms/sign-in/form-provider";
import LoginForm from "@/components/forms/sign-in/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignInPage = () => {
  const [signUp, setSignUp] = useState<string>("/sign-up");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const redirectUrl = query.get("redirect_url");
    if (redirectUrl) {
      setSignUp(`/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`);
    }
  }, []);

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInFormProvider>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button type="submit" className="w-full">
                Submit
              </Button>
              <p>
                Don’t have an account?{" "}
                <Link href={signUp} className="font-bold">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </SignInFormProvider>
      </div>
    </div>
  );
};

export default SignInPage;
