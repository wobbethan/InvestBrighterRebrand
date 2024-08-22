import {
  onDeleteSectionServer,
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
  } = useForm<SectionSettingsProps>({
    resolver: zodResolver(SectionSettingsSchema),
  });

  const onUpdateSettings = handleSubmit(async (values) => {
    if (values.section) {
      const updatedName = await onUpdateSectionName(id, values.section);
      if (updatedName) {
        updatedName.status === 200
          ? toast("Success", { description: updatedName.message })
          : toast("Error", { description: updatedName.message });
      }
    }
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
  };
};
