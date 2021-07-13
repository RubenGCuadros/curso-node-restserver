const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria, 
    borrarCategoria
} = require('../controllers/categorias');
const { existeCategoriaById } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaById ),
    validarCampos,    
], obtenerCategoria );

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT ,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

//Actualizar un registro por id - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaById ),
    validarCampos
], actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaById ),
    validarCampos
], borrarCategoria);

module.exports = router;