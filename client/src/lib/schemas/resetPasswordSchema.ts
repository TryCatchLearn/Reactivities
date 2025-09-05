import z from "zod";
import { requiredstring } from "../util/util";

export const resetPasswordSchema = z.object({
    newPassword: requiredstring("newPassword"),
    confirmPassword: requiredstring("confirmPassword"),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Dear User, Passwords Should Match",
        path: ["confirmPassword"],
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
