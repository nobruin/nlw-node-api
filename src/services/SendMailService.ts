import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class SendMailService {
private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then(account =>{
            this.client = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass
                }
            }
            );
        });

        
    }

    async execute(to: string, subject: string, mailBody: object, path:string){
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const maitemplateParse = handlebars.compile(templateFileContent);
        const html = maitemplateParse(mailBody);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Preview url: %s", nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();