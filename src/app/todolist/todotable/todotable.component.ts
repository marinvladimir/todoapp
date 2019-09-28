import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoitemService } from '../../shared/todoitem.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogModule } from '@angular/material';
import { MatCheckbox } from '@angular/material';
import { TodoitemComponent } from '../todoitem/todoitem.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { PopupService } from '../../shared/popup.service';
import { EventEmitterService } from '../../shared/event-emitter.service';
import { NumberValueAccessor } from '@angular/forms';
import { CdkStepLabel } from '@angular/cdk/stepper';

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
   this.popupService.openConfirmDialog("Are you sure you want to delete this record?").afterClosed().subscribe(
    res => {
       if(res){
         this.service.deleteItem($key);
         this.notificationService.warn('Record was deleted.');
       }
     });
  }

  onDelMultiple(){
    let pag_view: HTMLElement = document.getElementsByClassName("mat-select-value")[0].lastChild.childNodes[1] as HTMLElement
    var num = this.listData.filteredData;
    var pag_size;
    var list_of_keys = [];
      if(pag_view.innerHTML == "5" && num.length==5){ pag_size = 5; }
      else if(pag_view.innerHTML == "10" && num.length==10){ pag_size = 10; }
      else if(pag_view.innerHTML == "25" && num.length==25){ pag_size = 25; }
      else if(pag_view.innerHTML == "50" && num.length==50){ pag_size = 50; }
      else if(pag_view.innerHTML == "100" && num.length==100){ pag_size = 100; }
      else if(document.getElementsByClassName("mat-table")[0].childNodes.length==7){ pag_size=1;}
      else if(document.getElementsByClassName("mat-table")[0].childNodes.length==8){ pag_size=2;}
      else if(document.getElementsByClassName("mat-table")[0].childNodes.length==9){ pag_size=3;}
      else if(document.getElementsByClassName("mat-table")[0].childNodes.length==10){ pag_size=4;}
      else if(document.getElementsByClassName("mat-table")[0].childNodes.length==11){ pag_size=5;}
     // else{ pag_size = num.length;}
    for(var i=0;i<pag_size;i++){
      if(document.getElementsByClassName("CheckBox")[i].classList[3] != undefined && document.getElementsByClassName("CheckBox")[i].classList[3] != "mat-checkbox-anim-checked-unchecked")
        {
          list_of_keys.push(num[i].$key);
        }
      }
      this.popupService.openConfirmDialog("Are you sure you want to delete those records?").afterClosed().subscribe(
        res => {
          if(res){
            if(list_of_keys.length){
            for(var k=0; k<list_of_keys.length; k++){             
              this.service.deleteItem(list_of_keys[k]);
            }
            this.notificationService.warn('Records were deleted.');
            }}
        }
        );
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
    let element7: HTMLElement = document.getElementById('add_info') as HTMLElement
    if(row != undefined){element7.innerHTML = row.additional;}
  }

}

