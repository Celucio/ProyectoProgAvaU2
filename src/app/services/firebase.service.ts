import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Persona } from '../../environments/persona';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  headers_object = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  httpOptions = {headers: this.headers_object};

  constructor(private http: HttpClient) {}

  registrarPersona(persona: any) {
    console.log("firebase");
    console.log(persona);
    return this.http.post('http://52.87.220.184:8080/persona', persona ,this.httpOptions);
  }

  verTodo() {
    return this.http.get<[any]>('http://52.87.220.184:8080/persona', this.httpOptions);
  }

  aceptarPedido(id: number){
    return this.http.put<Persona>(`http://52.87.220.184:8080/aceptar/${id}`, this.httpOptions);
  }

  cancelarPedido(id: number){
    return this.http.put<Persona>(`http://52.87.220.184:8080/cancelar/${id}`, this.httpOptions);
  }

  enviarComprobante(id: number){
    return this.http.put<Persona>(`http://52.87.220.184:8080/cancelar/${id}`, this.httpOptions);
  }
}
