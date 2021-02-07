import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Invitado } from '../models/invitado-model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-invitados-list',
  templateUrl: './invitados-list.component.html',
  styleUrls: ['./invitados-list.component.scss']
})
export class InvitadosListComponent implements OnInit {

  filtro: FormControl;
  invitadosFiltrados: Observable<Invitado[]>
  invitados: Invitado[];
  private collectionRef: AngularFirestoreCollection<Invitado>;
  constructor(
    private db: AngularFirestore
  ) {
    this.filtro = new FormControl();
    this.invitados = [];
    this.invitadosFiltrados = of([]);
    this.collectionRef = db.collection('invitados', ref => ref.orderBy('nombre'));
  }


  get sinInvitados(): boolean {
    return !this.invitados.some(x => true);
  }

  ngOnInit(): void {

    this.collectionRef
      .snapshotChanges()
      .subscribe((querySnapshot) => {
        this.invitados = [];
        querySnapshot.forEach(doc => {
          const data = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          this.invitados.push(
            {
              id: docId,
              nombre: data.nombre,
              confirmado: data.confirmado,
              telefono: data.telefono,
              correo: data.correo
            }
          )
        });

        this.invitadosFiltrados = this.filtro.valueChanges
          .pipe(
            startWith(''),
            map(value => this.filtrar(value))
          );
      })


  }


  private filtrar(filtro: string): Invitado[] {
    const lower = filtro.toLowerCase();
    return this.invitados
      .filter(invitado => invitado.nombre.toLowerCase()
        .includes(lower));
  }

}
