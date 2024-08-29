"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Section } from "@prisma/client";

export const onGetUserInfo = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const userInfo = await client.user.findUnique({
        where: { clerkId: user.id },
        include: { subscription: true },
      });
      if (userInfo) {
        return { status: 200, user: userInfo };
      }
    } catch (error) {}
  }
};

export const onJoinSection = async (section: string) => {
  const user = await currentUser();
  if (!user) {
    redirectToSignIn();
  } else {
    try {
      const userInfo = await client.user.update({
        where: { clerkId: user.id },
        data: {
          section: {
            connect: { id: section },
          },
          company: {
            disconnect: true,
          },
          companyRole: null,
        },
      });
      if (userInfo) {
        return { status: 200, user: userInfo };
      }
    } catch (error) {
      console.error(error);
      return { status: 400, message: "Failed to join section" };
    }
  }
};
