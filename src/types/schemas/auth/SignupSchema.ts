import { z } from 'zod';
export const signupSchema = z.object({
  username: z.string().nonempty("Username is required"),
  name: z.string().nonempty("Name is required"),
  email: z.email({ error: "Invalid email format" }),
  password: z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/),
  confirmPassword: z.string().nonempty(),
  bio: z.string().optional().default(""),
  interests: z.array(z.string().nonempty("Interest should not be empty")).nonempty("At least input one interest"),
  socialLinks: z.array(z.httpUrl({ normalize: true, error: "Url should be a valid https url" })).optional().default([])
  
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });
  }
});

export type SignupForm = z.infer<typeof signupSchema>;