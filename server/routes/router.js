import express from "express";
const router = new express.Router();
import {home} from '../controllers/home.js'
import { signUp } from "../controllers/signup_contr.js";
import { login } from "../controllers/login_contr.js";
import { addQualification, getQualifDetail } from "../controllers/qualification_contr.js";



router.post('/register', signUp);
router.post('/submitLogin', login)
router.post('/admin/addQualification', addQualification)
router.post('/getQualifDetail', getQualifDetail)


router.get('/', home);
// router.get('/render_loginPage', login);

export default router;