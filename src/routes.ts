
import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";


const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendEmailController = new SendMailController(); 

router.post("/users", userController.create);
router.get("/users", userController.list);

router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.list);

router.post("/sendMail", sendEmailController.execute);
router.get("/sendMail", sendEmailController.list);

export { router }
