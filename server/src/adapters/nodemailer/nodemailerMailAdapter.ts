import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  //Conexão e-mail
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c4ecd84e137785",
    pass: "bd986a8c09156c",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      //envia o e-mail com o feedback
      from: "Equipe Feedback App <suporte@feedbackapp.com>",
      to: "Lu <luclucs@dev.com>",
      subject,
      html: body,
    });
  }
}
