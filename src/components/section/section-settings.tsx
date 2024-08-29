"use client";
import { useSectionSettings } from "@/hooks/settings/section/use-section-settings";
import React from "react";
import { Separator } from "../ui/separator";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import Loader from "../loader";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Section } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import UploadButton from "../upload-button";

type Props = {
  id: string;
  section: Section;
};

const SectionSettingsForm = ({ id, section }: Props) => {
  const {
    register,
    errors,
    loading,
    onUpdateSettings,
    onDeleteSection,
    deleting,
    control,
  } = useSectionSettings(id);

  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-xl">Section Settings</h2>
        <div className="flex flex-col md:flex-row gap-5 pt-5 items-start">
          <div>
            <Image
              src={`https://ucarecdn.com/${section.image}/`}
              alt="Section image"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-row gap-5 items-start ">
            <FormGenerator
              label="Section name"
              register={register}
              name="section"
              errors={errors}
              type="text"
              inputType="input"
              placeholder={section.name}
            />
            <FormGenerator
              label="Section description"
              register={register}
              name="description"
              errors={errors}
              type="text"
              inputType="textarea"
              placeholder={section.description}
            />
          </div>
        </div>
        <Separator orientation="horizontal" className="my-5" />
        <h2 className="font-bold text-xl">Section Privacy</h2>
        <div className="flex gap-10 pt-5">
          <Card className="flex md:flex-row flex-col gap-5 items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Anonymous Investing</CardTitle>
              <CardDescription>
                All investments for this section will be anonymous
              </CardDescription>
            </div>
            <div>
              <FormGenerator
                register={register}
                name="anonymous"
                errors={errors}
                type="bool"
                inputType="switch"
                checked={section.anonymous}
                control={control}
              />
            </div>
          </Card>
          <Card className="flex md:flex-row flex-col gap-5 items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Public Accounts</CardTitle>
              <CardDescription>
                Student companies will have the option to be visible to
                real-world investors
              </CardDescription>
            </div>
            <div>
              <FormGenerator
                register={register}
                name="public"
                errors={errors}
                type="bool"
                inputType="switch"
                checked={section.public}
                control={control}
              />
            </div>
          </Card>
        </div>
        <Separator orientation="horizontal" className="my-5" />
        <h2 className="font-bold text-xl">Investment settings</h2>
        <div className="flex gap-10 pt-5 items-end">
          <Card className="flex md:flex-row flex-col gap-5 items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Investment Limit</CardTitle>
              <CardDescription>
                Set a limit on the maximum number of investments a company can
                receive
              </CardDescription>
            </div>
            <div>
              <FormGenerator
                register={register}
                name="maxInvestments"
                errors={errors}
                type="bool"
                inputType="switch"
                checked={section.maxInvestments}
                control={control}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteSection}
          variant="destructive"
          type="button"
          className="px-10 h-[50px]"
        >
          <Loader loading={deleting}>Delete Section</Loader>
        </Button>
        <Button
          type="submit"
          className="w-[100px] h-[50px] bg-IBgreen hover:bg-IBgreen"
        >
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};

export default SectionSettingsForm;
