import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      remember: ['']
    })
  }

  comprobar() {
    console.log(this.formulario);
  }

}
