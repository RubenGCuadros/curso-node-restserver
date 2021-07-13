const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está en uso`)
    }
}

const existeUsuarioById = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`)
    }
}

/**
 * Categorias validators
 */

 const existeCategoriaById = async( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`)
    }
}

/**
 * Productos validators
 */

 const existeProductoById = async( id ) => {
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id no existe ${ id }`)
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById
}
