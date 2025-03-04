import {z} from 'zod'
export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
})


export const signupSchema = z.object({
    username: z
      .string()
      .min(5, { message: 'Username must be at least 5 characters long' })
      .max(30, { message: 'Username cannot exceed 30 characters' })
      .nonempty({ message: 'Username is required' }),
  
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .nonempty({ message: 'Password is required' }),
  
    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirm password is required' })
      .refine(
        (val) => val !== '', 
        { message: 'Confirm password is required' }
      ),
    role: z
      .enum(['admin', 'user'], {
        errorMap: () => ({message: 'Role must be either "user" or "admin"'})
      })
      .default('user'),
  }).refine(
    (data) => data.confirmPassword === data.password, 
    {
      message: 'Confirm password must match password',
      path: ['confirmPassword'], 
    }
  );

  export type LoginFormData = z.infer<typeof loginSchema>;
  export type SignupFormData = z.infer<typeof signupSchema>;