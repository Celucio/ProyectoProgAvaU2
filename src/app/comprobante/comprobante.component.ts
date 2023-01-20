import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/environments/persona';
import { FirebaseService } from '../services/firebase.service';


import Swal from 'sweetalert2'


@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.scss']
})
export class ComprobanteComponent implements OnInit {

  
  index: number = 1;
  listaPersona!: [Persona];


  registerForm!: FormGroup; // No provee una inicialización
  selectedItem: any;
  
  isCollapsed = false;

  constructor(private servicio: FirebaseService, private formBuilder: FormBuilder, private router: Router) {
  }

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
      imageCtrol: new FormControl(null, [Validators.required, Validators.pattern(/\.(jpeg|jpg|gif|png)$/)]),
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.consultar();
  }

  consultar(){
    this.servicio.verTodo().subscribe(res=>{
      console.log("Correcto");
      console.log(res);
      this.listaPersona = res;
    },
    (err) => console.log(err)
    );
  }

  editable!: boolean;

  ngOnChanges(changes: SimpleChanges) {
    // actualizar propiedades y/o llamar a metodo para refrescar
    this.consultar();
  }

  save(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.router.navigate(['/transacciones']);
      
    } else {
      this.registerForm. markAllAsTouched();
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }

  enviarComprobante(id: number) {
    this.servicio.enviarComprobante(id).subscribe(res => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Swal.fire({
        title: '¿Seguro que quiere enviar el comprobante?',
        text: "Este mensaje es una confirmación, no se podrá modificar más adelante.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, enviar comprobante',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultar();
          Toast.fire({
            icon: 'success',
            title: 'El comprobante se ha enviado con éxito'
          })
        } else (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        )
      });
      this.registerForm.reset();
    },
      (err) => {
        console.log(err);
      }
    );
  }

  get imageCtrol() {
    return this.registerForm.get('imageCtrol');
  }
}
