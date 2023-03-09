import { Injectable} from '@nestjs/common'
import { MailService } from "@sendgrid/mail"
import { verificationMail } from './emails/emails'

@Injectable()
export class EmailService {
  constructor(
    private mail: MailService
  ) {
    mail.setApiKey(process.env.SENDGRID_API_KEY)
  }

  async sendEmailVerification(addressee: string, token: string, userType: string) {
    const email = verificationMail(addressee, token, userType);

    try{
        const emailSent = await this.mail.send(email)

        if(emailSent[0].statusCode == 202) {
          return true
        }
        return false
    } catch (err) {
      console.log(err)
        return false
    }
  }

}
