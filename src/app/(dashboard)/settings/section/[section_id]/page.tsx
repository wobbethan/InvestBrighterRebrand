import { useSection } from "@/hooks/entity/use-entity";
import { Section } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { onGetSection } from "@/actions/entity";
import { onGetUserInfo } from "@/actions/user/user";
import SectionNotFound from "@/components/section/section-404";
import AccessDenied from "@/components/section/denied-access";
import SectionSettingsForm from "@/components/section/section-settings";

type Props = { params: { section_id: string } };

const SectionSettingsPage = async ({ params }: Props) => {
  const user = (await onGetUserInfo())?.user;
  const section = (await onGetSection(params.section_id)).section;
  //todo early return if user does not own section
  if (!section) return <SectionNotFound />;
  if (section?.teacherId !== user?.id) return <AccessDenied />;
  return <SectionSettingsForm id={section?.id} name={section?.name} />;
};

export default SectionSettingsPage;
