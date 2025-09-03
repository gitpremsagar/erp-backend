import { z } from "zod";

export const AssignPrivilegeSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  privilegeId: z.string().min(1, "Privilege ID is required"),
});
