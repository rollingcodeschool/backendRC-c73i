import {Router} from "express";
import { crearUsuario, login } from "../controllers/usuarios.controllers.js";


const router = Router();

router.route("/registrar").post(crearUsuario)
router.route("/").post(login)
// post("/login", login).post(, register);

export default router
 
