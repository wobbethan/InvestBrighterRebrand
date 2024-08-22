"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const onUpdateSectionName = async (id: string, updatedName: string) => {
  try {
    const domain = await client.section.update({
      where: { id },
      data: { name: updatedName },
    });
    if (domain) {
      return { status: 200, message: "Domain updated" };
    }
    return {
      status: 400,
      message: "Error updating name!",
    };
  } catch (error) {}
};

export const onDeleteSectionServer = async (id: string) => {
  const user = await currentUser();

  if (!user) return;
  //todo remove section picture from upload care
  try {
    const validUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (validUser) {
      const deletedDomain = await client.section.delete({
        where: {
          teacherId: validUser.id,
          id,
        },
        select: {
          name: true,
        },
      });

      if (deletedDomain) {
        return {
          status: 200,
          message: `${deletedDomain.name} was deleted successfully`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
