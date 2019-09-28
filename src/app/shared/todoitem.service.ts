import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; 

@Injectable({
  providedIn: 'root'
})
export class TodoitemService { 

  constructor(public firebase: AngularFireDatabase) { }   

  todoList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    additional: new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      id: '',
      name: '',
      description: '',
      time: '',
      additional: '',
    });
  }

  getTodo(){
    this.todoList = this.firebase.list('todo_items');
    return this.todoList.snapshotChanges();
  }

  insertItem(todoitem){
    this.todoList.push({
      id: todoitem.id,
      name: todoitem.name,
      description: todoitem.description,
      time: todoitem.time,
      additional: todoitem.additional
    });
  }

  updateItem(todoitem){
    this.todoList.update(todoitem.$key,{
      id: todoitem.id,
      name: todoitem.name,
      description: todoitem.description,
      time: todoitem.time,
      additional: todoitem.additional
    });
  }

  deleteItem($key: string){
    this.todoList.remove($key);
  }

  populateForm(todoitem){
    this.form.setValue(todoitem);
  }
}
