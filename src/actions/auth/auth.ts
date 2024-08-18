"use server";
import { PrismaClient, Prisma, Plans, $Enums } from "@prisma/client"; // Import Prisma and its enums
import { client } from "@/lib/prisma";
import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";

export const onCompleteUserRegistration = async (
  fullName: string,
  clerkId: string,
  type: $Enums.AccountTypes
) => {
  try {
    const subPlan =
      type === $Enums.AccountTypes.STUDENT
        ? $Enums.Plans.STUDENT
        : type === $Enums.AccountTypes.INSTRUCTOR
        ? $Enums.Plans.FREE
        : $Enums.Plans.INVESTOR;

    const registered = await client.user.create({
      data: {
        fullName,
        clerkId,
        type,
        subscription: {
          create: {
            plan: subPlan,
          },
        },
      },
      select: {
        fullName: true,
        id: true,
        type: true,
      },
    });
    if (registered) {
      return {
        status: 200,
        message: "Successfully registered user",
        user: registered,
      };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) redirectToSignIn();
  else {
    try {
      const authenticated = await client.user.findUnique({
        where: { clerkId: user.id },
        select: {
          fullName: true,
          id: true,
          type: true,
        },
      });
      if (authenticated) {
        return { status: 200, user: authenticated };
      }
    } catch (error) {}
  }
};
