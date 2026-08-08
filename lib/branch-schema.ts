import { z } from "zod";

export const branchSchema = z.object({
  name: z.string().min(2, "Branch name is required"),
  code: z.string().min(2, "Branch code is required"),
  phone: z.string().min(8, "Enter a valid phone number"),
  email: z.email("Enter a valid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  status: z.enum(["active", "inactive"]),
});
export type BranchFormValues = z.infer<typeof branchSchema>;
