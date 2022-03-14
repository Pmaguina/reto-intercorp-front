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
  promedioEdad?: Number;
  desvEstandar?: Number;

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
      this.calcularPromedioEdades(this.clientes)
    });

  }

  calcularPromedioEdades(listClientes: Cliente[]) {
    
    let sum = 0;
    let sumatoria = 0;
    let varianza = 0;

    if(listClientes.length > 0) {
      listClientes.forEach(item => {
        sum = sum + parseInt(item.edad);
      });
  
      this.promedioEdad = sum / listClientes.length;

      listClientes.forEach(item => {
        sumatoria = Math.pow(parseInt(item.edad) - (sum / listClientes.length), 2);
        varianza = varianza + sumatoria;
      });

      varianza = varianza / (listClientes.length - 1);
      this.desvEstandar = Math.sqrt(varianza);

    } else {
      this.promedioEdad = 0,
      this.desvEstandar = 0
    }
  }
  
}
