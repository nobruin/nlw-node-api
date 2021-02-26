import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {

    async execute(request: Request, response: Response) {

        const { email, surveyId } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email, });

        if (!user) {
            return response.status(409).json({
                error: "User does not exists"
            });
        }

        const survey = await surveyRepository.findOne({ id: surveyId });

        if (!survey) {
            return response.status(409).json({
                error: "survey does not exists"
            });
        }

        const mailBody = {
            name: user.name,
            title:survey.title,
            description: survey.description,
            user_id:user.id,
            link:process.env.URL_MAIL
        };

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where:[{userId: user.id}, {value: null}]
        });
        
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveyUserAlreadyExists){
            await  SendMailService.execute(email, survey.title, mailBody, npsPath);
            return  response.send(surveyUserAlreadyExists);      
        }

        const surveyUser = surveyUserRepository.create({
            userId: user.id,
            surveyId
        });

        await surveyUserRepository.save(surveyUser);
        SendMailService.execute(email, survey.title, mailBody, npsPath);
        response.send(surveyUser);

    }

    async list(request: Request, response: Response){
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find();
        response.send(surveysUsers);

    }
}

export { SendMailController };
