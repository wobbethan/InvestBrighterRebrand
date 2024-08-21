"use server";

import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const onGetUserInfo = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const userInfo = await client.user.findUnique({
        where: { clerkId: user.id },
        include: {
          company: true,
          ownedCompany: true,
          section: true,
          sections: true,
        },
      });
      if (userInfo) {
        return { status: 200, user: userInfo };
      }
    } catch (error) {}
  }
};
