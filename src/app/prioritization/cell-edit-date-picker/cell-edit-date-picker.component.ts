import {  AfterViewInit, Component, ViewChild,ViewContainerRef,OnInit, } from '@angular/core';

import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cell-edit-date-picker',
  templateUrl: './cell-edit-date-picker.component.html',
  styleUrls: ['./cell-edit-date-picker.component.css']
})
export class CellEditDatePickerComponent  implements ICellEditorAngularComp, AfterViewInit{

  privateparams: any;
  privateselectedColor:string=null;
  publicvalue: any;
  inpData:any;
  model: NgbDateStruct;
  disabled = true;
  date: {year: number, month: number};
    @ViewChild('d', {static:null}) publicinput;
  params: any;
  selectedColor: string;
  value: string;
  constructor(privatecalendar: NgbCalendar) { }
   
  ngOnInit() {
  // this.model=this.calendar.getToday()
    }
   
  refresh(params: any): boolean {
  throw new Error("Method not implemented.");
    }
   
  agInit(params) {
  this.params = params;
  this.value = this.params;
  this.inpData=params;
    }
  dateChange(model){ 
  this.params.api.stopEditing();
     }
  getValue(): any {
  if(this.model){
  this.value=this.model.month+'/'+this.model.day+'/'+this.model.year;
  return this.value;
      }
  else
  return this.params.value;
  
    }
   
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
     }
  colorChange(color)
     {
  this.selectedColor=color;
  //  this.disabled=false;
     }
  isPopup(): boolean {
  return true;
    }
  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
  
      }
   
  close(){
  this.params.api.stopEditing();
  }
  }
  
  