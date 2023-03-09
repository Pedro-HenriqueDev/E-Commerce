export interface UserFromJwt {
    id: string
    email: string
    name: string
    role: number
    specialty?: string
    room?: number
  }