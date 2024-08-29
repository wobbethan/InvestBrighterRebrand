import { useSection } from "@/hooks/entity/use-entity";
import { Section } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { onGetSection } from "@/actions/entity";
import { onGetUserInfo } from "@/actions/user/user";
import SectionNotFound from "@/components/section/section-404";
import AccessDenied from "@/components/section/denied-access";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinkSnippet from "@/components/section/link-snippet";

const SectionSettingsForm = dynamic(
  () => import("@/components/section/section-settings"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const SectionDetails = dynamic(
  () => import("@/components/section/section-details"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

type Props = { params: { section_id: string } };

const SectionSettingsPage = async ({ params }: Props) => {
  const user = (await onGetUserInfo())?.user;
  const section = (await onGetSection(params.section_id)).section;
  const plan = user?.subscription?.plan;
  //todo early return if user does not own section
  if (!section) return <SectionNotFound />;
  if (section?.teacherId !== user?.id) return <AccessDenied />;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3 items-center">
        <Avatar>
          <AvatarImage
            src={`https://ucarecdn.com/${section.image}/`}
            width={50}
            height={50}
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <h2 className="font-bold text-2xl">{section.name}</h2>
        <LinkSnippet id={section.id} type="section" />
      </div>
      <Tabs defaultValue="overview" className="my-5">
        <TabsList className="!rounded-bl-[0px] !rounded-br-[0px] !bg-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" className="!h-[2px]" />
        <TabsContent value="overview" className="!p-5  border-2 !m-0">
          <SectionDetails section={section} plan={plan!} />
        </TabsContent>
        <TabsContent value="settings" className="!p-5  border-2 !m-0">
          <SectionSettingsForm id={section.id} section={section} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SectionSettingsPage;
