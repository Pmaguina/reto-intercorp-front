import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private dbPath = '/clientes';

  clientesRef: AngularFireList<Cliente>;

  constructor(private db: AngularFireDatabase) { 
    this.clientesRef = db.list(this.dbPath)
  }

  getAll(): AngularFireList<Cliente> {
    console.log("Clientes: " + this.clientesRef);
    return this.clientesRef;
  }

  create(cliente: Cliente): any {
    return this.clientesRef.push(cliente);
  }
}
