import { Component, OnInit } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  user = {};

  registerForm!: FormGroup; // No provee una inicialización

  constructor(private formBuilder: FormBuilder, private router: Router, private servicio: FirebaseService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.servicio.verTodo().subscribe(res=>{
      console.log("Correcto");
      console.log(res);
    },
    (err) => console.log(err)
    );
  }

  onSubmit() {
    console.log(this.user, this.registerForm.value);
    this.router.navigate(['home']);
  }
  toLogin() {
    this.router.navigate(['']);
  }

  private buildForm() {
    // Enviar todos los campos con sus validaciones
    this.registerForm = this.formBuilder.group({
      // Creamos cada uno de los controladores
      nameCtrl: new FormControl('', [Validators.required]),
      passCtrl: new FormControl('', [Validators.required]),
      dniCtrl: new FormControl('', [Validators.required]),
      celularCtrl: new FormControl('', [Validators.required]),
      dateCtrl: new FormControl('', [Validators.required]),
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const value = this.registerForm.value;
      console.log(value);
      this.router.navigate(['/home']);
    } else {
      console.log(this.registerForm);
      this.registerForm.markAsTouched();
    }
  }

  addItem(): void {
    if (this.registerForm.valid) {
      const value = this.registerForm.value;
      console.log(value);
      this.router.navigate(['/home']);
      console.log('1');
    } else {
      console.log('3');
      console.log(this.registerForm);
      this.registerForm.markAsTouched();
    }
  }

  get nameCtrl() {
    return this.registerForm.get('nameCtrl');
  }
}
