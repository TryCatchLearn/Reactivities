import {z} from "zod";
import { requiredstring } from "../util/util";

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredstring('displayName'),
    password: requiredstring('password')


})

export type RegisterSchema = z.infer<typeof registerSchema>;