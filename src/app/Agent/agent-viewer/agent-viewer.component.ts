import { element } from 'protractor';
import { AgentService } from './../agent.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentInfo } from '../Models/AgentInfo';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogModalComponent } from 'src/app/General/dialog-modal/dialog-modal.component';
import { interval } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-agent-viewer',
  templateUrl: './agent-viewer.component.html',
  styleUrls: ['./agent-viewer.component.scss']
})
export class AgentViewerComponent implements OnInit {

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  AgentData: Array<AgentInfo> = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'createDate', 'updateDate', 'action'];


  constructor(private service: AgentService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.GetAllAgents()
      .subscribe((res: Array<AgentInfo>) => {
        //set agent list
        this.AgentData = res;

      });
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.AddNewAgent(result.data);
      }else if(result.event == 'Update'){
        this.UnregisterAgent(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  AddNewAgent(row_obj: AgentInfo){

    this.service.AddNewAgent(row_obj.name).subscribe( res => {
       console.log('agent id:' + res + 'registerted successfully');
        this.GetAllAgents();
      });
  }

  AgentHeartbit(row_obj){
    const counter = interval(5000);
    counter.subscribe( n => {
    this.service.AgentHeartbit(row_obj.id).subscribe( res => {
       console.log('agent id:' + res + 'heart successfully');
        this.GetAllAgents();
      })}) ;
  }

  GetAllAgents(){
    this.service.GetAllAgents().subscribe( res => this.AgentData = res);
  }

  UnregisterAgent(row_obj){
    this.service.UnregisterAgent(row_obj.id).subscribe( res => {
      console.log('agent id:' + row_obj.id + 'UnregisterAgent successfully');
      this.GetAllAgents();
      });
  }
  deleteRowData(row_obj){
    this.service.DeleteAgnet(row_obj.id).subscribe( res => {
      console.log('agent id:' + row_obj.id + 'deleteRowData successfully');
      this.GetAllAgents();
      });
  }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//  }

  sortData(sort: Sort) {
    const data = this.AgentData.slice();
    if (!sort.active || sort.direction === '') {
      this.AgentData = data;
      return;
    }

    this.AgentData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'updateDate':
          return compare(a.updateDate, b.updateDate, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
