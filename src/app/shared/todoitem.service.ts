import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'; 
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class TodoitemService { 

  constructor(public firebase: AngularFireDatabase) { }   

  todoList: AngularFireList<any>;
  today = new Date(); 
  current_time: string;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl(''),
    additional: new FormControl(''),
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      id: '',
      name: '',
      description: '',
      time: this.current_time,
      additional: '',
    });
  }

  getTodo(){
    this.todoList = this.firebase.list('todo_items');
    this.current_time = this.today.toString();
    var full_time = this.current_time.match(/\w{3}\s\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/g);
    this.current_time = full_time[0];
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
