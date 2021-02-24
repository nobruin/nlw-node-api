import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
    async create(request: Request, response: Response){
        const {name, email} = request.body;
        const userRepository = getCustomRepository(UserRepository);
        const userAlreadyExists = await userRepository.findOne({email,});

        if(userAlreadyExists){
            return response.status(409).json({
                error:"User already exists!"
            });
        }

        const user = userRepository.create({name, email});
        await userRepository.save(user);
        response.status(201).send(user);
    }

    async list(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

        response.status(206).send(users);
    }
}

export { UserController };
