import { Usuario } from "../database/model/usuario.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    //verificar si el mail ya existe en la BD
    const emailValidacion = await Usuario.findOne({ email });
    if (emailValidacion) {
      return res.status(400).json({
        mensaje: "Este correo ya se encuentra registrado.",
      });
    }
    //encriptar el password
    //   const saltos = await bcrypts.genSalt(8);
    //   const passEncriptada = await bcrypts.hash(password, saltos);
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.save();
    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      email: nuevoUsuario.email,
      nombreUsuario: nuevoUsuario.nombreUsuario,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      mensaje: "Error al intentar crear un usuario.",
    });
  }
};
