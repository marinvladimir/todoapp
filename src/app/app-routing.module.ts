import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedViewComponent } from './todolist/detailed-view/detailed-view.component';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
 { path: '', redirectTo: 'todolist', component: TodolistComponent },
 { path: 'detailed', component: DetailedViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }