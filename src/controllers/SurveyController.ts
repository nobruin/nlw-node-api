import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController {
    async create(request: Request, response: Response){
        const {title, description} = request.body;
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyAlreadyExists = await surveyRepository.findOne({title,});

        const survey = surveyRepository.create({title, description});
        await surveyRepository.save(survey);
        response.status(201).send(survey);
    }

    async list(request: Request, response: Response){
        const surveyRepository = getCustomRepository(SurveyRepository);

        const surveys = await surveyRepository.find();

        response.status(206).send(surveys);

     }
}

export { SurveyController };
