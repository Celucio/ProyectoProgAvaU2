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
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent implements OnInit {

  listaPersona!: [Persona];
  listaAceptados!: [Persona];
  listaRechazados!: [Persona];

  estado: String = "";
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
    },
      (err) => console.log(err)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // actualizar propiedades y/o llamar a metodo para refrescar
    this.consultar();
  }

  aceptar(id: number, track: String) {
    Swal.fire({
      title: '¿Seguro que quiere aceptar el pedido?',
      text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, aceptar pedido',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.confirmacionPedido(id, "aceptado", track).subscribe(res => {
          console.log(res.track);
          this.consultar();
        },
          (err) => console.log(err)
        );
        swalWithBootstrapButtons.fire(
          '¡El pedido fue aceptado!',
          'Usted ha aceptado el pedido correctamente, el cliente será notificado y deberá subir el comprobante de pago.',
          'success'
        )
      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    });
  }

  cancelar(id: number, track: String) {
    Swal.fire({
      title: '¿Seguro que quiere cancelar el pedido?',
      text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cancelar pedido',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.confirmacionPedido(id, "cancelado", track).subscribe(res => {
          console.log(res.track);
          this.consultar();
        },
          (err) => console.log(err)
        );
        swalWithBootstrapButtons.fire(
          '¡El pedido fue cancelado!',
          'Usted ha cancelado el pedido correctamente, el proceso se canceló.',
          'success'
        )
      } else (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      )
    });
  }

}
