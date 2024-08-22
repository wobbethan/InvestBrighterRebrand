import React from "react";
import FormGenerator from "../form-generator";
import UploadButton from "@/components/upload-button";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { useSection } from "@/hooks/entity/use-entity";

type Props = {};

const CreateSectionForm = (props: Props) => {
  const { onAddSection, register, errors, loading } = useSection();
  return (
    <Loader loading={loading}>
      <form onSubmit={onAddSection} className="mt-3 w-6/12 flex flex-col gap-3">
        <FormGenerator
          inputType="input"
          register={register}
          name="section"
          label="Section"
          errors={errors}
          placeholder="Monday Class"
          type="text"
        />
        <UploadButton
          register={register}
          label="Upload Image"
          errors={errors}
        />
        <Button type="submit" className="w-full">
          Create Section
        </Button>
      </form>
    </Loader>
  );
};

export default CreateSectionForm;
