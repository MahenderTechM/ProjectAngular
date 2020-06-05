import {  Component, OnInit, ViewChild, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import {  ActivatedRoute} from "@angular/router";
import {  PrioritizationService} from "../services/prioritization.service";
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  AllCommunityModules,Module  } from "@ag-grid-community/all-modules";
import {  CellEditDatePickerComponent } from './cell-edit-date-picker/cell-edit-date-picker.component';
import {  Prioritization } from '../models/prioritization';
import {  MultiSelectDropdownComponent } from '../shared/multi-select-dropdown/multi-select-dropdown.component';
import {  ActionItemPopupComponent } from './action-item-popup/action-item-popup.component';
import {  CntApprovalsComponent } from './cnt-approvals/cnt-approvals.component';
import {  AssignUserPopupComponent } from './assign-user-popup/assign-user-popup.component';


@Component({
  selector: 'app-prioritization',
  templateUrl: './prioritization.component.html',
  styleUrls: ['./prioritization.component.css']
})
export class PrioritizationComponent implements OnInit, AfterViewInit {
  @ViewChild('contentRef',{static:false}) contentRef:ElementRef;
  dropdownList = [];
  selectedItems = [];
  activeTab:string='all';
  dropdownSettings = {};
  prioritization:Prioritization;
  public defaultColDef;
  public modules: Module[] = AllCommunityModules;
  public sideBar;
  public gridApi;
  public gridColumnApi;
  public frameworkComponents;
  public getRowHeight;
  gridOptions:any;
  columnDefs:any;
  public lookupData:any;
  rowData:any;
  public categorization:string='all'
  rowDataOriginal: any;
  lookUpView:any;

  searchString: string = "";
  
  constructor(private route:ActivatedRoute,private prioritizationService:PrioritizationService,private modalService: NgbModal)
   {
    this.prioritization=new Prioritization();
    this.gridOptions={
       context:{
      componentParent:this
    }
  }  

   

  
  this.defaultColDef = {
    filter:true,
    resizable: true,
    width: 150,
    suppressSizeToFit: true,
  };
    this.getRowHeight = function(params) {
      return (
        30
      );
    };
    this.sideBar = {
      toolPanels: [
        'columns',
        {
          id: 'filters',
          labelKey: 'filters',
          labelDefault: 'Filters',
          iconKey: 'menu',
          toolPanel: 'agFiltersToolPanel',
          enablePivot:false
        },
      
      ],
      defaultToolPanel:'none',
    };
  }
  ngAfterViewInit(): void {
    console.log(this.contentRef);
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  
  ngOnInit() {
    let category=this.route.snapshot.paramMap.get('category');
    if(category){
     this.categorization=category;
    }
    this.prioritizationService.GetProjectList().subscribe(data=>{
      this.rowData=data;
      this.rowDataOriginal=data;
    })
    this.prioritizationService.GetPrioLookup().subscribe(data=>{
      this.lookUpView=data;
      this.columnDefs=this.GetPriorityColumns();
    });
    //  this.prioritizationService.GetPrioritizationDetails().subscribe(data=>{
       
    //   this.rowData=data;
    //   this.rowDataOriginal=data;

    // });
  }
  public onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
   
  }


  updateMultiSelectDropdownValue(rowNodeValue,key,value){
    let rowNode=this.gridApi.getRowNode(rowNodeValue);
    rowNode.setDataValue(key,value);
  }


  public onCellClicked($event) {
   
}
  GetPriorityColumns(){
    return[
      {
        width:50,
        headerName: '#',
        suppressMenu:true,
        filter:false,
        valueGetter: function(params) {
          return params.node.rowIndex+1;
        },
        pinned: 'left',   
      },
      {
        width:70,
        headerName: "Site Url",
        field: "siteUrl",
        filter:false,
        suppressMenu:true,
        pinned: 'left',
        cellRenderer: function(params) {
          return '<a href="https://www.w3schools.com/html/"><img border="0" alt="W3Schools" src="./assets/images/sitemap.png" width="20" height="20"></a>'
        }
        },
      {
        headerName: 'Customer',
        field: 'customer',
        editable:true,
        pinned: 'left',
        singleClickEdit: true,
        cellEditorFramework:MultiSelectDropdownComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            return params.value;
          }
        },
      },
      { width:220,
        headerName: 'Application/Description',
        field: 'applicationOrDescription',
        editable:true,
        singleClickEdit: true,
        sortable:true,
        pinned: 'left',
      },
      {
        headerName: 'ProjectCode',
        field: 'projectCode',
        editable:true,
        singleClickEdit: true,
  
      },
      
      {
        headerName: 'ProjectStatus',
        field:'projectStatus',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams:{
          values:this.GetProjectStatus()
          } 
       
      
        },
      {
        headerName: 'CustomerLead',
        field: 'customerLead',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:AssignUserPopupComponent,
      },
      {
        
        headerName: 'ProgramLead',
        field: 'programLead',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:AssignUserPopupComponent,
      },
      {
        headerName: 'TechLead',
        field: 'techLead',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:AssignUserPopupComponent,
      },
      {
        headerName: 'FastTrack',
        field: 'fastTrack',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
          cellEditorParams:{
            values:this.GetYesOrNo()
            } 
       
      },
      {
        headerName: 'CustomerType',
        field: 'customerType',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams:{
        values:this.GetCustomersType()
        } 
      },
      
      {
        headerName: 'Market',
        field: 'market',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams:{
          values:this.GetMarket()
          } 
      },
      {
        headerName: 'Device',
        field: 'device',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams:{
          values:this.GetDevice()
          } 
      },
      {
        headerName: 'BusinessModel',
        field: 'businessModel',
        editable:true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams:{
          values:this.GetBu()
          } 
      },
      {
        headerName: 'ProjectRequestDate',
        field: 'projectRequestDate',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
      },
      {
        headerName: 'Engage',
        field: 'engage',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
      },
      {
        headerName: 'Scope',
        field: 'scope',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
  
      },
      {
        headerName: 'Propose',
        field: 'propose',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
      },
      {
        headerName: 'CTN Approvals',
        field: 'ctnApprovals',
        sortable: true,
        editable: true,
        singleClickEdit: true,
        cellEditorFramework:CntApprovalsComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            return params.value;
          }
        },
      },
      {
      headerName: 'CTC Approved',
      field: 'ctcApproved',
      editable:true,
      singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
    },
    {
      headerName: 'SignedExecute',
      field: 'signedExecute',
      editable:true,
      singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
    },
      {
        headerName: 'Comments',
        field: 'comments',
        editable:true,
        singleClickEdit: true
        
      },
      {
        headerName: 'CreatedDate',
        field: 'createdDate',
        editable:true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
      },
      {
        headerName: 'CreatedBy',
        field: 'createdBy',
        editable:true,
        singleClickEdit: true
      },
      {
        headerName: 'Actions',
        field: 'actions',
        filter:false,
        editable:true,
        singleClickEdit: true,  
        cellEditorFramework:ActionItemPopupComponent,
          cellRenderer: function(params) {
          return '<a ><img  src="./assets/images/projectactions.png" width="20" height="20"></a>'
        }

      },
    {
      headerName: 'NextActiondate',
      field: 'nextActionDate',
      editable:true,
      singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            let date=params.value.split('T');
            return date[0];
          }
        },
    },
    {
      headerName: 'ProjectID',
      field: 'projectId',
      editable:true,
      singleClickEdit: true
      
    },
    {
      headerName: 'Descripton',
      field: 'descripton',
      editable:true,
      singleClickEdit: true
    },
    {
      headerName: 'BU',
      field: 'bu',
      editable:true,
      singleClickEdit: true
    },
    {
      headerName: 'IsVisible',
      field: 'isVisible',
      editable:true,
      singleClickEdit: true
    },
    {
      headerName: 'ProjectOwner',
      field: 'projectOwner',
      editable:true,
      singleClickEdit: true
    },
    {
      headerName: 'ProjectName',
      field: 'projectName',
      editable:true,
      singleClickEdit: true
    }
      ];

  }


   sitemapUrlRenderer(params) {
    return `<a href="${params.value}" target="_blank">
      <span class="ag-siteMap-icon"></span>
      </a> `;
  }
  actionItem(params) {
    return `<span class="ag-action-item-icon"></span>`;
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter(this.searchString);
  }

  GetMarket(){
    return this.lookUpView.marketViewModels.map((mark)=>{
      return mark.marketName
    })
}
GetBu(){
  return this.lookUpView.bussinessViewModels.map((bus)=>{
    return bus.businessName
  })
}
GetDevice(){
  return this.lookUpView.deviceViewModels.map((div)=>{
    return div.deviceName
  })
}
   
    GetProjectStatus(){
      return this.lookUpView.projectStatusViewModels.map((Stat)=>{
        return Stat.projectStatusName
      })
  }

  GetYesOrNo(){
    return this.lookUpView.fastTrackViewModels.map((ys)=>{
      return ys.fastTrackName
    })
}

  GetCustomersType(){
   return this.lookUpView.customerTypeViewModels.map((cust)=>{
      return cust.customerTypeName
    })
  }

  GetCustomers(){
  this.lookUpView.customerViewwModels.map((cust)=>{
  return cust.customerName
})

}
   renderImage(params){
    return `<span class="ag-comment-icon"></span>`;
  }

  onCellValueChanged(params: any){
    console.log(params);
  debugger;
    this.prioritizationService.savePriorDetailsArray(params.data).subscribe(data=>{

   })
        console.log(params);
      }

      onCellValueEditStoped(event){
        console.log(event);

      }

      changeTab(tabName:string){
          this.rowData=[];
          this.activeTab=tabName;

       if(tabName==='all'){
        this.rowData=this.rowDataOriginal;
       }
       else{
          this.rowData=this.rowDataOriginal.filter(function(el){
            return el["projectStatus"]==tabName;
          });

        }
      }

}

