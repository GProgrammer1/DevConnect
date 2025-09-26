import z from "zod";

export const forgotSchema = z.object({
    email: z.email()
});

export type ForgotSchema = z.infer<typeof forgotSchema>; 

