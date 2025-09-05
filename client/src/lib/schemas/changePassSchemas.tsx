import z from "zod";
import { requiredstring } from "../util/util";

export const changePassSchema = z.object({
    currentPassword: requiredstring("Current Password"),
    newPassword: requiredstring("New Password"),
    confirmPassword: requiredstring("Confirm Password"),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Dear User, Passwords Should Match",
        path: ["confirmPassword"],
    });

export type ChangePassSchema = z.infer<typeof changePassSchema>;
