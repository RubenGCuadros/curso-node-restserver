
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser más de 6 caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( emailExiste ),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPost);

router.put('/:id',[
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check('rol').custom( esRoleValido ),
        validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
], usuariosDelete);



module.exports = router;
