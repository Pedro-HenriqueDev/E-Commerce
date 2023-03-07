import { Patients, Doctors } from '@prisma/client'

declare global {
    namespace Express {
      export interface Request {
        user: Doctors | Patients
      }
    }
}