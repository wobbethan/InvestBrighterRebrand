"use server";
import { client } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { $Enums, Section } from "@prisma/client";

// Creating data //
export const onIntegrateCompany = async (name: string, image: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const companyExists = await client.user.findFirst({
      where: {
        clerkId: user.id,
      },
      select: {
        companyId: true,
      },
    });
    console.log(companyExists);
    if (!companyExists?.companyId) {
      const newCompany = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          company: {
            create: {
              name,
              balance: 0,
              valuation: 0,
              investments: 0,
              image,
            },
          },
        },
      });

      if (newCompany) {
        return { status: 200, message: "Company successfully created" };
      }
    }
    return {
      status: 400,
      message: "You may only be apart of one company",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "There was an error creating your company",
    };
  }
};

export const onIntegrateSection = async (name: string, image: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            sections: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (
      (subscription?.subscription?.plan == $Enums.Plans.FREE &&
        subscription._count.sections < 2) ||
      (subscription?.subscription?.plan == $Enums.Plans.PRO &&
        subscription._count.sections < 5) ||
      subscription?.subscription?.plan == $Enums.Plans.UNLIMITED
    ) {
      const newDomain = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          sections: {
            create: {
              name,
              image,
            },
          },
        },
      });

      if (newDomain) {
        return { status: 200, message: "Section successfully created" };
      }
    } else {
      return {
        status: 400,
        message:
          "You've reached the maximum number of sections, please upgrade your plan",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "Error creating section",
    };
  }
};

// Getting account specific data //

export const onGetAllAccountSections = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const sections = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        sections: true,
      },
    });
    return { status: 200, message: "Sections returned", sections: sections };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error getting sections for account" };
  }
};

export const onGetAccountCompany = async () => {
  const user = await currentUser();
  if (!user) return;
  try {
    const company = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        ownedCompany: { select: { id: true } },
        company: true,
      },
    });
    return {
      status: 200,
      message: "Company returned",
      company: company?.company,
    };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error getting account's company" };
  }
};

export const onGetSection = async (sectionId: string) => {
  try {
    const section = await client.section.findUnique({
      where: {
        id: sectionId,
      },
    });
    if (section) {
      return {
        status: 200,
        message: "Section returned",
        section: section,
      };
    }
    return {
      status: 400,
      message: "Section not found",
    };
  } catch (error) {
    console.log(error);
    return { status: 400, message: "Error getting section information" };
  }
};
