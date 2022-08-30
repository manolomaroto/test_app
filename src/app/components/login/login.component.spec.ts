import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

import {Router, Routes} from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let router: Router;  

  const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '**', redirectTo: 'themen', pathMatch: 'full'}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener un get emailNoValido',() => {
    expect(component.emailNoValido).toBeDefined();
  });

  it('Debe tener un get passwordNoValido',() => {
    expect(component.passwordNoValido).toBeDefined();
  });

  it('Debe tener un método comprobar', () => {
    expect(component.comprobar).toBeDefined();
  })


  it('Debe crear un formulario con 3 campos', () => {
    expect(component.formulario.contains('email')).toBeTruthy();
    expect(component.formulario.contains('password')).toBeTruthy();
    expect(component.formulario.contains('remember')).toBeTruthy();
  });

  it('El email debe de ser obligatorio', () => {
    const control = component.formulario.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('El email debe de ser válido', () => {
    const control = component.formulario.get('email');
    control.setValue('correo@correo.com');
    expect(control.valid).toBeTruthy();
  });

  it('El password debe de ser obligatorio', () => {
    const control = component.formulario.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('Debe de llamar a comprobar  al pulsar Enviar', async() => {
    spyOn(component, 'comprobar');
    const sendButton = fixture.debugElement.query(By.css('button'));
    sendButton.nativeElement.click();
    await fixture.whenStable().then(() => {
      expect(component.comprobar).toHaveBeenCalled();
    });
  });

  it('Debe de llamar a comprobar y navegar a home  al pulsar Enviar', async() => {
    spyOn(router, 'navigate');
    const sendButton = fixture.debugElement.query(By.css('button'));
    const controlEm = component.formulario.get('email');
    controlEm.setValue('asd@asd.com');
    const controlPass = component.formulario.get('password');
    controlPass.setValue('12345');
    sendButton.nativeElement.click();
    await fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    });
  });

});
