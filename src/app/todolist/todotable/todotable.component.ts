import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoitemService } from '../../shared/todoitem.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogModule } from '@angular/material';
import { TodoitemComponent } from '../todoitem/todoitem.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { PopupService } from '../../shared/popup.service';
import { EventEmitterService } from '../../shared/event-emitter.service';

@Component({
  selector: 'app-todotable',
  templateUrl: './todotable.component.html',
  styleUrls: ['./todotable.component.css']
})
export class TodotableComponent implements OnInit {

  constructor(private service: TodoitemService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private popupService: PopupService,
              private eventEmitterService: EventEmitterService    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','name','description','time','actions'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: string;
  mainKey: any;

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
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
      });

 
  }

  
  OnXClick(){
    this.searchKey = "";
    this.SearchEng();
  }

  SearchEng(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  Create(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TodoitemComponent, dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(TodoitemComponent, dialogConfig);
  }

  onDelete($key){
   this.popupService.openConfirmDialog("Are you sure you want to delete this records?").afterClosed().subscribe(
     res => {
       if(res){
         this.service.deleteItem($key);
         this.notificationService.warn('Item was deleted.');
       }
     });
  }

  onDetail(row){
    let element: HTMLElement = document.getElementById('row_info') as HTMLElement
    let output_row = JSON.stringify(row);
    element.innerHTML = output_row;
    let element2: HTMLElement = document.getElementById('key_info') as HTMLElement
    if(row != undefined){element2.innerHTML = row.$key;}
    let element3: HTMLElement = document.getElementById('id_info') as HTMLElement
    if(row != undefined){element3.innerHTML = row.id;}
    let element4: HTMLElement = document.getElementById('name_info') as HTMLElement
    if(row != undefined){element4.innerHTML = row.name;}
    let element5: HTMLElement = document.getElementById('desc_info') as HTMLElement
    if(row != undefined){element5.innerHTML = row.description;}
    let element6: HTMLElement = document.getElementById('time_info') as HTMLElement
    if(row != undefined){element6.innerHTML = row.time;}
  }

}

