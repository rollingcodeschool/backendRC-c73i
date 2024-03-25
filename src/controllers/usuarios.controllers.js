import { Usuario } from "../database/model/usuario.js";
import bcrypt from "bcrypt";
export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificar si el mail ya existe en la BD
    const emailValidacion = await Usuario.findOne({ email });
    if (emailValidacion) {
      return res.status(400).json({
        mensaje: "Este correo ya se encuentra registrado.",
      });
    }
    //encriptar el password
    const saltos = bcrypt.genSaltSync(10);
    const passEncriptada = bcrypt.hashSync(password, saltos);
    const nuevoUsuario = new Usuario(req.body);
    //actualizar el password
    nuevoUsuario.password = passEncriptada;
    nuevoUsuario.save();
    //todo: agregar un token
    
    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      email: nuevoUsuario.email,
      nombreUsuario: nuevoUsuario.nombreUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar crear un usuario.",
    });
  }
};
