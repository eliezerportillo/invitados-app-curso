import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {


  usuario: any;
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.usuario = {};
    this.auth.currentUser.then(user => this.usuario = user);
  }


  get foto(): string | null {
    return (this.usuario as firebase.User).photoURL;
  }

  get tieneFoto(): boolean {
    return this.foto ? true : false;
  }

  ngOnInit(): void {
  }


  cerrarSesion(){
    this.auth
    .signOut()
    .then(() => this.router.navigate(['login']));
  }

}
