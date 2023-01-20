export  class Persona {
    nombre: string;
    apellido: string;
    cedula: string;
    email: string;
    comentario: string;
    residencia: string;
    estado: string;
    creacion: string;
    expira: string;
  
    constructor(
      nombre: string,
      apellido: string,
      cedula: string,
      email: string,
      comentario: string,
      residencia: string
      ) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.cedula = cedula;
      this.email = email;
      this.comentario = comentario;
      this.residencia = residencia;
      this.estado = "";
      this.creacion = "";
      this.expira = "";
    }
  }