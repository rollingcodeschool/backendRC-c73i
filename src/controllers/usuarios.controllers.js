import { Usuario } from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

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
    const token = await generarJWT(nuevoUsuario._id, nuevoUsuario.email);

    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      email: nuevoUsuario.email,
      nombreUsuario: nuevoUsuario.nombreUsuario,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar crear un usuario.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //verificar si el mail ya existe en la BD
    const usuarioBuscado = await Usuario.findOne({ email });
    //si no encuentro el mail del usuario
    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto - correo",
      });
    }

    //verificar el password
    const passwordValido = bcrypt.compareSync(
      password,
      usuarioBuscado.password
    );
    //si el password es erroneo
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto - password",
      });
    }

    //generar el token nuevamente
    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);
    res.status(200).json({
      mensaje: "Los datos del usuario son correctos",
      email: email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar loguear un usuario.",
    });
  }
};
