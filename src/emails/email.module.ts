import { Module  } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { EmailService } from './email.service';

@Module({
  exports: [EmailService],
  providers: [EmailService, MailService]
})

export class EmailModule {}
