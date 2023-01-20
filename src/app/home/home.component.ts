import { Component, OnInit } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Persona } from '../../environments/persona';

import Swal from 'sweetalert2'


import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  persona!: Persona;

  ciudades = ["Machala", "Santo Domingo de los Tsáchilas", "Esmeraldas", "Manta", "Portoviejo", "Riobamba", "Latacunga", "Ibarra", "Babahoyo", "Tulcán", "Tena", "Puyo", "Nueva Loja", "Quevedo"]

  ganado = ["Vaca", "Toro", "Caballo", "Cerdo", "Oveja", "Cabra", "Buey", "Burro", "Yegua", "Mula", "Llama", "Chivo"]

  newProjectName: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private servicio: FirebaseService) {
    this.buildForm();
  }

  registerForm!: FormGroup; // No provee una inicialización


  private buildForm() {
    // Enviar todos los campos con sus validaciones
    this.registerForm = this.formBuilder.group({
      // Creamos cada uno de los controladores
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required, Validators.pattern(/^[1-2][0-9]{9}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      comentario: new FormControl('', [Validators.minLength(30)]),
      residencia: new FormControl('', [Validators.required]),
    });
  }


  registrarPedido() {
    this.persona = new Persona(
      this.registerForm.value.nombre,
      this.registerForm.value.apellido,
      this.registerForm.value.cedula,
      this.registerForm.value.email,
      this.registerForm.value.comentario,
      this.registerForm.value.residencia
    );
    this.servicio.registrarPersona(this.persona).subscribe(res => {
      Swal.fire({
        title: '¡Se ha registrado el pedido correctamente!',
        text: 'Su solicitud está siendo procesada, se le enviará una notificación a su correo para continúe con su proceso en el apartado de "Confirmaciones".',
        icon: 'success',
        confirmButtonText: 'Continuar'
      });
      this.registerForm.reset();
    },
      (err) => {
        console.log(err);
        Swal.fire({
          title: '¡Ha ocurrido un error en el proceso!',
          text: 'Su solicitud no ha sido procesada, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }
    );
  }

  ngOnInit() {
    this.servicio.verTodo().subscribe(res => {
    },
      (err) => console.log(err)
    );
  }

  save(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.router.navigate(['/confirmacion']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get nombreCtrol() {
    return this.registerForm.get('nombre');
  }

  get apellidoCtrol() {
    return this.registerForm.get('apellido');
  }

  get cedulaCtrol() {
    return this.registerForm.get('cedula');
  }

  get emailCtrol() {
    return this.registerForm.get('email');
  }

  get comentarioCtrol() {
    return this.registerForm.get('comentario');
  }

  get residenciaCtrol() {
    return this.registerForm.get('residencia');
  }
}
