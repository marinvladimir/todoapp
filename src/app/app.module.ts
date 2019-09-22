import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoitemComponent } from './todolist/todoitem/todoitem.component';
import { TodoitemService } from './shared/todoitem.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { environment } from '../environments/environment';
import { TodotableComponent } from './todolist/todotable/todotable.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { DetailedViewComponent } from './todolist/detailed-view/detailed-view.component';
import { AppRoutingModule } from './app-routing.module';
import { EventEmitterService } from './shared/event-emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TodoitemComponent,
    TodotableComponent,
    MatConfirmDialogComponent,
    DetailedViewComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AppRoutingModule
  ],
  providers: [TodoitemService, EventEmitterService],
  bootstrap: [AppComponent],
  entryComponents: [TodoitemComponent, MatConfirmDialogComponent]
})
export class AppModule { }
