import { z } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export type SectionSettingsProps = {
  section?: string;
  description?: string;
  public?: boolean;
  anonymous?: boolean;
  maxInvestments?: boolean;
};

export const SectionSettingsSchema = z.object({
  section: z.string().optional(),
  description: z.string().optional(),
  public: z.boolean().optional(),
  anonymous: z.boolean().optional(),
  maxInvestments: z.boolean().optional(),
});
