// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const LOCALHOST = 'https://gestionsantamariaback.herokuapp.com/';

export const LOGIN = LOCALHOST.concat('login');

export const ENDPOINT_USUARIOS = LOCALHOST.concat('usuario/');

export const INSERTAR_ESTUDIANTE = ENDPOINT_USUARIOS.concat('nuevoestudiante');
export const INSERTAR_ADMINISTRADOR = ENDPOINT_USUARIOS.concat('nuevoadministrador');
export const LISTAR_ESTUDIANTES = ENDPOINT_USUARIOS.concat('listarestudiantes');
export const LISTAR_ADMINISTRADORES = ENDPOINT_USUARIOS.concat('listaradministradores');
export const BUSCAR_USUARIO = ENDPOINT_USUARIOS.concat('buscarusuario');
export const ACTUALIZAR_USUARIO = ENDPOINT_USUARIOS.concat('actualizarusuario');
export const CAMBIAR_CONTRASEÑA = ENDPOINT_USUARIOS.concat('cambiarcontrasena');
export const ELIMINAR_USUARIO = ENDPOINT_USUARIOS.concat('eliminarusuario/');

