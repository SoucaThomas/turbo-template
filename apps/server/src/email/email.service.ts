import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  static sendEmail(to: string, subject: string, text: string) {
    console.log(to, subject, text);
  }
}
