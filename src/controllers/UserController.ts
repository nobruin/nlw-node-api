import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";


class UserController {
    async create(request: Request, response: Response){
        const {name, email} = request.body;
        const userRepository = getRepository(User);
        const userAlreadyExists = await userRepository.findOne({email,});

        if(userAlreadyExists){
            return response.status(409).json({
                error:"User already exists!"
            });
        }

        const user = userRepository.create({name, email});
        await userRepository.save(user);
        response.send(user);
    }
}

export { UserController}