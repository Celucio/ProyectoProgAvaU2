function generateUniqueId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(x => x.toString(16).padStart(2, "0"))
    .join("");
}

export class Persona {
  id!: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  comentario: string;
  residencia: string;
  estado1: string;
  estado2: string;
  creacion: string;
  expiracion: string;
  track: string;
  imagen: string;
  total: number;

  constructor(
    nombre: string,
    apellido: string,
    cedula: string,
    email: string,
    comentario: string,
    residencia: string,
    total: number,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.email = email;
    this.comentario = comentario;
    this.residencia = residencia;
    this.estado1 = "";
    this.estado2 = "";
    this.creacion = "";
    this.expiracion = "";
    this.imagen = "";
    this.track = generateUniqueId();
    this.total = total;
  }
}