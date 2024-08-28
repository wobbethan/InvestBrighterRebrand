"use server";
import { onGetUserInfo, onJoinSection } from "@/actions/user/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { onGetSection } from "../../../../actions/entity/index";

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const user = await currentUser();
  if (!user) redirect(`/sign-in?redirectUrl=/join/section/${params.id}`);

  const joinSection = await onJoinSection(params.id);
  const section = await onGetSection(params.id);

  if (joinSection?.status === 200) {
    return <div>Successfully joined section</div>;
  } else {
    return <div>Error joining section</div>;
  }
};

export default Page;
