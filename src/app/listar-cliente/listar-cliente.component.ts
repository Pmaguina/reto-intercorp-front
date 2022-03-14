import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/servicio/clientes.service';
import { Cliente } from 'src/app/models/cliente.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})

export class ListarClienteComponent implements OnInit {

  clientes?: Cliente[];

  constructor(private _clienteService: ClientesService) {}

  ngOnInit(): void {
	  this.getClientes()
  }

  getClientes() {
    this._clienteService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.clientes = data;
    });
  }
}
