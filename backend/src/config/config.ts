import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT
export const dbUri = process.env.DB_URI as string
export const jwtSecret = process.env.JWT_SECRET as string

