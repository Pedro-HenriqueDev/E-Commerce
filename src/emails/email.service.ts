import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from "nodemailer"
import { configMail, verificationMail } from './config/nodemailer';

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmailSistem(addressee: string, token: string, userType: string) {
    const transporter = nodemailer.createTransport(configMail)

    const emailSended = await transporter.sendMail(verificationMail(addressee, token, userType))

    if(emailSended.accepted[0] != undefined) {
      return "A Verification email has been sent to your email address."
    }

    throw new InternalServerErrorException("Ocorreu um erro")
  }
}
