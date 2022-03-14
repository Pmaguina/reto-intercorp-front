import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicio/clientes.service';
import { Cliente } from 'src/app/models/cliente.model';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  createCliente: FormGroup;
  titulo = 'Crear Cliente';
  loading = false;
  submitted = true;

  cliente: Cliente = new Cliente();

  constructor(
    private _clienteService: ClientesService,
    private router: Router) { 
      
      this.createCliente = new FormGroup({
        nombre: new FormControl(),
        apellido: new FormControl(),
        edad: new FormControl(),
        fecNac: new FormControl()
      });
    }

  ngOnInit(): void {
  }

  agregarCliente() {
    
    this.cliente = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      edad: this.createCliente.value.edad,
      fecNac: this.createCliente.value.fecNac,
    } 

    console.log("nombre: " + this.createCliente.value.nombre);

    this.loading = true;
    this._clienteService.create(this.cliente).then(() => {
      this.loading = false;
      this.router.navigate(['/listar-cliente']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }
}
