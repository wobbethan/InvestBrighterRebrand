import {
  onDeleteSectionServer,
  onUpdateSectionBools,
  onUpdateSectionDescription,
  onUpdateSectionName,
} from "@/actions/entity/settings";
import {
  SectionSettingsProps,
  SectionSettingsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSectionSettings = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SectionSettingsProps>({
    resolver: zodResolver(SectionSettingsSchema),
  });

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);
    //Name update
    if (values.section) {
      const updatedName = await onUpdateSectionName(id, values.section);
      if (updatedName) {
        updatedName.status !== 200 &&
          toast("Error", { description: updatedName.message });
      }
    }
    //Description update
    if (values.description) {
      const updatedDescription = await onUpdateSectionDescription(
        id,
        values.description
      );
      if (updatedDescription) {
        updatedDescription.status !== 200 &&
          toast("Error", { description: updatedDescription.message });
      }
    }
    //Boolean updates
    const updateSectionBooleans = await onUpdateSectionBools(id, values);
    if (updateSectionBooleans) {
      updateSectionBooleans.status !== 200 &&
        toast("Error", { description: updateSectionBooleans.message });
    }
    setLoading(false);
    toast("Success", { description: "Section settings updated" });
  });

  const onDeleteSection = async () => {
    setDeleting(true);
    const deleted = await onDeleteSectionServer(id);
    if (deleted) {
      deleted.status === 200
        ? toast("Success", { description: deleted.message })
        : toast("Error", { description: deleted.message });
      setDeleting(false);
    }
  };

  return {
    register,
    errors,
    loading,
    onUpdateSettings,
    deleting,
    onDeleteSection,
    control,
  };
};
