import { z } from "zod";
import { requiredString } from "../util/util";

export const changePasswordSchema = z.object({
    currentPassword: requiredString('currentPassword'),
    newPassword: requiredString('newPassword'),
    confirmPassword: requiredString('confirmPassword')
})
.refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;