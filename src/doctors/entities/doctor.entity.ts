import { User } from "src/auth/models/UserModel"


export class Doctor extends User {
    specialty: string
    room: number
}