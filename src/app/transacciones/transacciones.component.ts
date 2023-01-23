import { Component, OnInit, SimpleChanges } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { Persona } from '../../environments/persona';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss'],
})
export class TransaccionesComponent implements OnInit {

  pendiente!: Boolean;
  completado!: Boolean;
  rechazado!: Boolean;

  listaPersona!: [Persona];
  estado: String = "pendiente";
    
  constructor(private servicio: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.consultar();
  }

  cambiarEstado(estado: String){
    this.estado = estado
    console.log(estado)
    this.consultar();
  }

  consultar() {
    this.servicio.verTodo().subscribe(res => {
      console.log("Correcto");
      console.log(res);
      this.listaPersona = res;
      this.pendiente = this.listaPersona.every(persona => persona.estado2 == 'pendiente');
      this.completado = this.listaPersona.every(persona => persona.estado2 == 'completado');
      this.rechazado = this.listaPersona.every(persona => persona.estado2 == 'rechazado');
    },
      (err) => console.log(err)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // actualizar propiedades y/o llamar a metodo para refrescar
    this.consultar();
  }


  aceptar(id: number) {
    Swal.fire({
      title: '¿Los datos del comprobante son correctos?',
      text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, completar pedido',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.confirmacionComprobante(id, "completado").subscribe(res => {
          this.consultar();
        },
          (err) => console.log(err)
        );
        swalWithBootstrapButtons.fire(
          '¡El pedido fue completado!',
          'El proceso de compra ha sido realizado con éxito.',
          'success'
        )
      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    });
  }

  cancelar(id: number) {
    Swal.fire({
      title: '¿Seguro que quiere rechazar el comprobante?',
      text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar pedido',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.confirmacionComprobante(id, "rechazado").subscribe(res => {
          this.consultar();
        },
          (err) => console.log(err)
        );
        swalWithBootstrapButtons.fire(
          '¡El comprobante fue rechazado!',
          'Se ha rechazado la compra correctamente. El proceso se canceló.',
          'success'
        )
      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    });
  }

}
