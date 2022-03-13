import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'crear-cliente', pathMatch: 'full' },
  { path: 'listar-cliente', component: ListarClienteComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: '**', redirectTo: 'crear-cliente', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
