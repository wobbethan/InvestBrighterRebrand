"use client";
import { useSectionSettings } from "@/hooks/settings/section/use-section-settings";
import React from "react";
import { Separator } from "../ui/separator";
import FormGenerator from "../forms/form-generator";
import { Button } from "../ui/button";
import Loader from "../loader";

type Props = {
  id: string;
  name: string;
};

const SectionSettingsForm = ({ id, name }: Props) => {
  const {
    register,
    errors,
    loading,
    onUpdateSettings,
    onDeleteSection,
    deleting,
  } = useSectionSettings(id);
  return (
    <form className="flex flex-col gap-8 pb-10" onSubmit={onUpdateSettings}>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Section Settings</h2>
        <Separator orientation="horizontal" />
        <div className="flex gap-2 pt-5 items-end w-[400px]">
          <FormGenerator
            label="Section name"
            register={register}
            name="section"
            errors={errors}
            type="text"
            inputType="input"
            placeholder={name}
          />
        </div>
      </div>
      {/* {plan === "PRO" || plan === "ULTIMATE"} */}
      {/* <div className="flex flex-col mt-5 gap-3">
        <div className="flex gap-4 items-center">
          <h2 className="font-bold text-2xl">Chatbot Settings</h2>
          <div className="flex gap-1 bg-cream rounded-full px-3 py-1 text-xs items-center font-bold">
            <PremiumBadge />
            Premium
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="grid md:grid-cols-2">
          <div className="col-span-1 flex flex-col gap-5 order-last md:order-first">
            <EditChatbotIcon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-1 relative ">
            <Image
              src="/images/bot-ui.png"
              className="sticky top-0"
              alt="bot-ui"
              width={530}
              height={769}
            />
          </div>{" "}
        </div>
      </div> */}
      <div className="flex gap-5 justify-end">
        <Button
          onClick={onDeleteSection}
          variant="destructive"
          type="button"
          className="px-10 h-[50px]"
        >
          <Loader loading={deleting}>Delete Section</Loader>
        </Button>
        <Button type="submit" className="w-[100px] h-[50px]">
          <Loader loading={loading}>Save</Loader>
        </Button>
      </div>
    </form>
  );
};

export default SectionSettingsForm;
