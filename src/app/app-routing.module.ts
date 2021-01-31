import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitadosListComponent } from './invitados-list/invitados-list.component';
import { LoginComponent } from './login/login.component';
import { RecepcionComponent } from './recepcion/recepcion.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ShellComponent,
    data: {
      titulo: 'Invitados App'
    },
    children: [
      {
        path: 'invitados',
        component: InvitadosListComponent,
        data: {
          titulo: 'Invitados'
        }
      },
      {
        path: 'recepcion',
        component: RecepcionComponent,
        data:{
          titulo: 'Recepción'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
