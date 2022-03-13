import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  constructor(private firestore: Firestore) { 

  }

  agregarCliente(cliente: any): Promise<any> {
    
    return null;
  }

  listarClientes(): Observable<any> {
    
    const collection1 = collection(this.firestore, "clientes");
    return collectionData(collection1);
  }
}
