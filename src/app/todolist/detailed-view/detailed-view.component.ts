import { Component, OnInit } from '@angular/core';
import { TodoitemService } from '../../shared/todoitem.service'; 
import { NotificationService } from '../../shared/notification.service';
import { MatTableDataSource, MatDialogConfig } from '@angular/material';
import { TodoitemComponent } from '../todoitem/todoitem.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { PopupService } from '../../shared/popup.service';
import { Location } from '@angular/common';
import { EventEmitterService } from '../../shared/event-emitter.service';    
import { element } from 'protractor';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  constructor(public service: TodoitemService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
    public popupService: PopupService,
    public _location: Location,
    public eventEmitterService: EventEmitterService ) { }

listData: MatTableDataSource<any>;
displayedColumns: string[] = ['id','name','description','time','actions'];
searchKey: string;

  ngOnInit() {
    this.service.getTodo().subscribe(
      list => {
        let array = list.map(
          item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
        });
      this.listData = new MatTableDataSource(array);
    });
    var element_row: HTMLElement = document.getElementById('row_info') as HTMLElement
    var element_row_detail: HTMLElement = document.getElementById('row') as HTMLElement
    var output_row = element_row.innerHTML; 
    element_row_detail.innerHTML = "Row: " + output_row;

    var element_key: HTMLElement = document.getElementById('key_info') as HTMLElement
    var element_key_detail: HTMLElement = document.getElementById('key') as HTMLElement
    var output_key = element_key.innerHTML; 
    element_key_detail.innerHTML = "Key: " + output_key;

    var element_id: HTMLElement = document.getElementById('id_info') as HTMLElement
    var element_id_detail: HTMLElement = document.getElementById('id') as HTMLElement
    var output_id = element_id.innerHTML; 
    element_id_detail.innerHTML = "Id: " + output_id;

    var element_name: HTMLElement = document.getElementById('name_info') as HTMLElement
    var element_name_detail: HTMLElement = document.getElementById('name') as HTMLElement
    var output_name = element_name.innerHTML; 
    element_name_detail.innerHTML = "Name: " + output_name;

    var element_desc: HTMLElement = document.getElementById('desc_info') as HTMLElement
    var element_desc_detail: HTMLElement = document.getElementById('desc') as HTMLElement
    var output_desc = element_desc.innerHTML; 
    element_desc_detail.innerHTML = "Description: " + output_desc;

    var element_time: HTMLElement = document.getElementById('time_info') as HTMLElement
    var element_time_detail: HTMLElement = document.getElementById('time') as HTMLElement
    var output_time = element_time.innerHTML; 
    element_time_detail.innerHTML = "Time: " + output_time;
  }

  onEdit(){
    var element_row_detail: HTMLElement = document.getElementById('row_info') as HTMLElement
    var row = JSON.parse(element_row_detail.innerHTML);
   
   // let array_position;
   // let data_list = this.listData.filteredData;
   // for(var i=0; i<data_list.length; i++){
   //   let temp = JSON.stringify(data_list[i]);
   //   if ( temp == element_row_detail.innerHTML){
   //     array_position = i;
   //   }
   // }

    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    let dialogRef = this.dialog.open(TodoitemComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //let new_change = JSON.stringify(this.listData.filteredData[array_position]);
      //var element_row_detail: HTMLElement = document.getElementById('row') as HTMLElement 
      //element_row_detail.innerHTML = "Row: " + new_change;
    });
  }

  onDelete(){
    let element_key_detail: HTMLElement = document.getElementById('key_info') as HTMLElement
    let $key = element_key_detail.innerHTML;
    this.popupService.openConfirmDialog("Are you sure you want to delete this records?").afterClosed().subscribe(
      res => {
        if(res){
          this.service.deleteItem($key);
          this.notificationService.warn('Item was deleted.');
          this._location.back();
        }
      });
   }

  backClicked() {
    let element_row_detail: HTMLElement = document.getElementById('row_info') as HTMLElement
      element_row_detail.innerHTML = "";
    let element_key_detail: HTMLElement = document.getElementById('key_info') as HTMLElement
      element_key_detail.innerHTML = "";
    let element_id_detail: HTMLElement = document.getElementById('id_info') as HTMLElement
      element_id_detail.innerHTML = "";
    let element_name_detail: HTMLElement = document.getElementById('name_info') as HTMLElement
      element_name_detail.innerHTML = "";
    let element_desc_detail: HTMLElement = document.getElementById('desc_info') as HTMLElement
      element_desc_detail.innerHTML = "";
    let element_time_detail: HTMLElement = document.getElementById('time_info') as HTMLElement
      element_time_detail.innerHTML = "";

    let element_row: HTMLElement = document.getElementById('row') as HTMLElement
      element_row.innerHTML = "";
    let element_key: HTMLElement = document.getElementById('key') as HTMLElement
      element_key.innerHTML = "";
    let element_id: HTMLElement = document.getElementById('id') as HTMLElement
      element_id.innerHTML = "";
    let element_name: HTMLElement = document.getElementById('name') as HTMLElement
      element_name.innerHTML = "";
    let element_desc: HTMLElement = document.getElementById('desc') as HTMLElement
     element_desc.innerHTML = "";
    let element_time: HTMLElement = document.getElementById('time') as HTMLElement
      element_time.innerHTML = "";
    this._location.back();
      }
}
