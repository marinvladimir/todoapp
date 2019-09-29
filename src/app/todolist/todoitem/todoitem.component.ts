import { Component, OnInit } from '@angular/core';
import { TodoitemService } from '../../shared/todoitem.service';
import { NotificationService } from '../../shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent implements OnInit {

  constructor(public service: TodoitemService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<TodoitemComponent>) {} 

    today = new Date(); 
    current_time: string;

  ngOnInit() {
    this.service.getTodo();
    this.current_time = this.today.toString();
    var full_time = this.current_time.match(/\w{3}\s\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}/g);
    this.current_time = full_time[0];
  }

  onClear(){
    this.service.form.reset();
    console.log(this.service.form.value);
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
      this.service.form.value.time = this.current_time;
      this.service.insertItem(this.service.form.value);}
      else
      this.service.updateItem(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submited Successfully!');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
