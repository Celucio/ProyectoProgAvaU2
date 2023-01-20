import { Component, OnInit, SimpleChanges } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { Persona } from '../../environments/persona';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent implements OnInit {

  index: number = 1;
  listaPersona!: [Persona];

  constructor(private servicio: FirebaseService, private router: Router) { }

  ngOnInit(): void {
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

  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 3000,
  //   timerProgressBar: true,
  //   didOpen: (toast) => {
  //     toast.addEventListener('mouseenter', Swal.stopTimer)
  //     toast.addEventListener('mouseleave', Swal.resumeTimer)
  //   }
  // })

  // Toast.fire({
  //   icon: 'success',
  //   title: 'Signed in successfully'
  // })

  aceptar(id: number) {
    this.servicio.aceptarPedido(id).subscribe(res => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      Swal.fire({
        title: '¿Seguro que quiere aceptar el pedido?',
        text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, aceptar pedido',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultar();
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
    },
      (err) => console.log(err)
    );
  }

  cancelar(id: number) {
    this.servicio.cancelarPedido(id).subscribe(res => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      Swal.fire({
        title: '¿Seguro que quiere cancelar el pedido?',
        text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cancelar pedido',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultar();
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
    },
      (err) => console.log(err)
    );
  }

}
