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
    this.current_time = JSON.stringify(this.today);
    var full_time = this.current_time.slice(1,this.current_time.length);
    full_time = this.current_time.slice(0,this.current_time.length-1);
    var date_only = full_time.slice(1,11);
    var time_only = full_time.slice(12,this.current_time.length-6);
    this.current_time = date_only + " " + time_only;
    console.log(time_only);
    console.log(date_only);
    console.log(this.today);
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value)
      this.service.insertItem(this.service.form.value);
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
