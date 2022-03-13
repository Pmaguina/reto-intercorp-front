import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/servicio/clientes.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})

export class ListarClienteComponent implements OnInit {

  clientes: any[] = [];

  constructor(private _clienteService: ClientesService) {
  }

  ngOnInit(): void {
	  this.getClientes()
  }

  getClientes() {
    this._clienteService.listarClientes().subscribe(data => {
      this.clientes = [];
      data.forEach((element: any) => {
        this.clientes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clientes);
    });
  }
}
