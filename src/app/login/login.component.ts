import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
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
    if (this.form.invalid) {
      return;
    }

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(response => {
        // ok
        this.router.navigate(['invitados']);
      }).catch(err => {

        // fail
        console.log(err.message);
      });
  }

  onLoginConGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        this.router.navigate(['invitados']);
      }).catch(err => {

        // fail
        console.log(err.message);
      });
  }

  onLoginConFacebook() {

    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(response => {
        this.router.navigate(['invitados']);
      }).catch(err => {

        // fail
        console.log(err.message);
      });
  }

}