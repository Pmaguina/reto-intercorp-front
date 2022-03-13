import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from 'src/app/servicio/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  createCliente: FormGroup;
  titulo = 'Crear Cliente';
  loading = false;
  constructor(
    private fb: FormBuilder,
    private _clienteService: ClientesService,
    private router: Router,
    private toastr: ToastrService) { 

      
    }

  ngOnInit(): void {
	  this.createCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      fecNacimiento: ['', Validators.required]
    })
  }

  agregarCliente() {
    const cliente: any = {
      nombre: this.createCliente.value.nombre,
      apellido: this.createCliente.value.apellido,
      edad: this.createCliente.value.edad,
      fecNac: this.createCliente.value.fecNacimiento
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(() => {
      this.toastr.success('El cliente fue registrado con exito!', 'Cliente Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/listar-cliente']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }
}
