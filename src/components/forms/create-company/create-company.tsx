import React from "react";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/upload-button";
import Loader from "@/components/loader";
import { useCompany } from "@/hooks/entity/use-entity";
import "@uploadcare/react-uploader/core.css";
type Props = {};

const CreateCompanyForm = (props: Props) => {
  const { onAddCompany, register, errors, loading } = useCompany();

  return (
    <Loader loading={loading}>
      <form onSubmit={onAddCompany} className="mt-3 w-6/12 flex flex-col gap-3">
        <FormGenerator
          inputType="input"
          register={register}
          label="Company Name"
          name="company"
          errors={errors}
          placeholder="InvestBrighter"
          type="text"
        />
        <UploadButton
          register={register}
          label="Upload Image"
          errors={errors}
        />
        <Button type="submit" className="w-full">
          Create Company
        </Button>
      </form>
    </Loader>
  );
};

export default CreateCompanyForm;
