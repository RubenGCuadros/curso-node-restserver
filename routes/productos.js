const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    borrarProducto
} = require('../controllers/productos');
const { existeCategoriaById, existeProductoById } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


/**
 * {{url}}/api/Productos
 */

//Obtener todas las Productos - publico
router.get('/', obtenerProductos );

//Obtener una Producto por id - publico
router.get('/:id', [
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos,    
], obtenerProducto );

//Crear Producto - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT ,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaById ),
    validarCampos
], crearProducto );

//Actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos
], actualizarProducto);

//Borrar una Producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos
], borrarProducto);

module.exports = router;