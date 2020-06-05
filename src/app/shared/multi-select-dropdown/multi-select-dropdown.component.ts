import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit,ICellRendererAngularComp {
  constructor() {
  }
  data = [];
  selectedItems = [];
  dropdownSettings = {};
  m_accessGroup:string;
  params:any;
  value:string;
  
  ngOnInit() {
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,

      defaultOpen:true
     };
  }
  onItemSelect(item: any) {
    this.m_accessGroup= this.selectedItems.map((e)=>{return e["item_text"]}).join(',');
    this.value=this.m_accessGroup;
  }
  getValue(): any {
    return this.value;
  }

  onSelectAll(items: any) {
    this.m_accessGroup= this.selectedItems.map((e)=>{return e["item_text"]}).join(',');
    this.value=this.m_accessGroup;
  }
  
  refresh(params: any): boolean {
    throw new Error("Method not implemented.");
  }
  agInit(params: import("ag-grid-community").ICellRendererParams): void {
   // this.value=params.value;
   console.log(params);
   if(params.colDef.field=='fab'){
     this.data= params.context.componentParent.lookupData.fabViewModelData.map(val=>{
        return {item_id:val.fabId,item_text:val.fab};
      });
   }
  else (params.colDef.field=="customer")
   {
      this.data= params.context.componentParent.lookUpView.customerViewModels.map(val=>{
      return {item_id:val.customerId,item_text:val.customerName};
    });
   }
  }
  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  }
  isPopup(): boolean {
    return true;
  }

  
}
