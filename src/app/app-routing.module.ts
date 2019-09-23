import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedViewComponent } from './todolist/detailed-view/detailed-view.component';
import { TodolistComponent } from './todolist/todolist.component';

const routes: Routes = [
 { path: '', redirectTo: 'Todolist', component: TodolistComponent },
 { path: 'Detailed', component: DetailedViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }