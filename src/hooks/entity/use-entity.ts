"use client";
import {
  CompanyCreationSchema,
  SectionCreationSchema,
} from "@/schemas/entity.schema";
// import { onIntegrateDomain } from "@/actions/settings";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { UploadClient } from "@uploadcare/upload-client";
import {
  onGetAccountCompany,
  onIntegrateCompany,
  onIntegrateSection,
} from "@/actions/entity";
import { useUserContextHook } from "@/context/user-info-context";
import { Company } from "@prisma/client";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

//use company hook
export const useCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(CompanyCreationSchema),
  });

  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const [isCompany, setIsCompany] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>();
  useEffect(() => {
    setIsCompany(pathname.split("/").pop());
  }, [pathname]);

  const onAddCompany = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    console.log(values.company);
    const uploaded = await upload.uploadFile(values.image[0]);

    const company = await onIntegrateCompany(values.company, uploaded.uuid);
    if (company) {
      reset();
      setLoading(false);
      toast(`${company.status == 200 ? "Success" : "Error"}`, {
        description: company.message,
      });
      router.refresh();
    }
  });

  const getCompany = async () => {
    const company = await onGetAccountCompany();
    setCompany(company?.company);
  };

  useEffect(() => {
    getCompany();
  }, []);

  return {
    register,
    onAddCompany,
    errors,
    loading,
    isCompany,
    setFiles,
    getCompany,
    company,
  };
};

//use section hook

export const useSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(SectionCreationSchema),
  });
  const [isSection, setIsSection] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsSection(pathname.split("/").pop());
  }, [pathname]);

  const onAddSection = handleSubmit(async (values: FieldValues) => {
    setLoading(true);
    if (values.image) {
    }
    const uploaded = await upload.uploadFile(values.image[0]);
    const section = await onIntegrateSection(values.section, uploaded.uuid);
    if (section) {
      reset();
      setLoading(false);
      toast("MESSAGE", {
        description: section.message,
      });
      router.refresh();
    }
  });
  return {
    register,
    onAddSection,
    errors,
    loading,
    isSection,
  };
};
