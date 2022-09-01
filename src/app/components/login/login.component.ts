import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  get emailNoValido() {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched
  }

  get passwordNoValido() {
    return this.formulario.get('password').invalid && this.formulario.get('password').touched
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      remember: [false]
    })
  }

  comprobar() {
    if(this.formulario.invalid) {
      Object.values(this.formulario.controls).forEach(control => {
        control.markAllAsTouched();
      })
    } else {
      this.router.navigate(['home']);
    }
  }

}
