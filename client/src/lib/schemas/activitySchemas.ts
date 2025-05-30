import {z} from 'zod';
const requiredstring= (fieldName: string) => z.string({required_error: `${fieldName} is required`}).min(1, {message: `${fieldName} is required`})

export const activitySchemas= z.object({
    title: requiredstring('Title'),
    description: requiredstring('Description'),
    category: requiredstring('Category'),
    date: z.coerce.date({
        message: 'Date is Required'
    }),
    location: z.object({
        venue: requiredstring('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
    })
})

export type ActivitySchema= z.infer<typeof activitySchemas>;