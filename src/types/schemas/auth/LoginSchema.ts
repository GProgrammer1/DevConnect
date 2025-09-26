import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().nonempty("Password is required")
});

export type LoginSchema = z.infer<typeof loginSchema>;