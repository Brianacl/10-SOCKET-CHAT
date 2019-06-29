class Usuarios {

    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        return this.personas.filter(persona => persona.sala === sala);
    }

    eliminarPersona(id) {
        let personaEliminada = this.getPersona(id);

        this.personas = this.personas.filter(persona => persona.id != id);

        return personaEliminada;
    }

}//Fin clase

module.exports = Usuarios;