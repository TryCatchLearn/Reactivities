import { DateArg, format, formatDistanceToNow } from "date-fns";
import { z } from "zod";

export function formatDate(date: DateArg<Date>) {
    return format(date, 'dd MMM yyyy H:mm a')
}
export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + ' ago'
}

export const requiredstring = (fieldName: string) =>
    z.string({ required_error: `${fieldName} is required` })
        .min(1, { message: `${fieldName} is required` })