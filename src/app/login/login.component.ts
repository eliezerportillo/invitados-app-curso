import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: ['elie', Validators.required],
      contrasenia: ['asas', Validators.required]
    });
  }

  get email(): string {
    return this.form.get('usuario')?.value;
  }

  get password(): string {
    return this.form.get('contrasenia')?.value;
  }

  ngOnInit(): void {

  }

  onLogin() {

  }

}
