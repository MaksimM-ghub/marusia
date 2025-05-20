import { z } from "zod";

export const UserSchema = z.object ({
    favorites: z.array(z.string()),
    surname: z.string(),
    name: z.string(),
    email: z.string(),
})

export type fetchMeTypes = z.infer<typeof UserSchema>

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
})

export type loginType = z.infer<typeof loginSchema>


const logoutSchema = z.object({
   status: z.boolean()
})

export type logoutType = z.infer<typeof logoutSchema>

export interface registerUserType {
  email: string,
  password: string,
  name: string,
  surname: string
}