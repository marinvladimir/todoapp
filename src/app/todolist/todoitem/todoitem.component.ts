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

  ngOnInit() {
    this.service.getTodo();
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
