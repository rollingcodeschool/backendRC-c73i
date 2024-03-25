import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  listarProductos,
  obtenerProducto,
} from "../controllers/productos.controllers.js";
import validacionesProducto from "../helpers/validacionProducto.js";
import validarJWT from "../helpers/verificarJWT.js";


const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post([validarJWT,validacionesProducto], crearProducto);
router
  .route("/producto/:id")
  .get(obtenerProducto)
  .put(editarProducto)
  .delete(borrarProducto);

export default router;
