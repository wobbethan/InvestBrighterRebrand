import { z } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export type SectionSettingsProps = {
  section?: string;
  image?: any;
  public?: boolean;
  anonymous?: boolean;
};

export const SectionSettingsSchema = z.object({
  section: z
    .string()
    .min(1, {
      message: "your section name must be at least 1 character long",
    })
    .optional(),
  image: z
    .any()
    .optional()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "An image less then 2MB is required",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG & PNG are accepted file formats",
    }),
  public: z.boolean().optional(),
  anonymous: z.boolean().optional(),
});
