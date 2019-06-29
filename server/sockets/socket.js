const { io } = require('../server');

const Usuarios = require('../classes/usuarios');
const usuarios = new Usuarios();

const crearMensaje = require('../utils/utils');

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        if(!usuario.nombre || !usuario.sala){
            return callback({
                err: true,
                msg: 'El nombre y la sala son necesarios'
            }); 
        }

        client.join(usuario.sala);

        let personas = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
        
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));

        callback(usuarios.getPersonasPorSala(usuario.sala));
    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.msg);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaEliminada = usuarios.eliminarPersona(client.id);

        client.broadcast.to(personaEliminada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaEliminada.nombre} salió`));
        client.broadcast.to(personaEliminada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaEliminada.sala));
    });

    client.on('mensajePrivado', data => {
        console.log(data);
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.idOtraPersona).emit('mensajePrivado', crearMensaje(persona.nombre, data.msg));
    });


});