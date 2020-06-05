import { Component, OnInit } from '@angular/core';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import { Prioritization } from '../models/prioritization';
import { ActivatedRoute, Router } from '@angular/router';
import { PrioritizationService } from '../services/prioritization.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminsupport',
  templateUrl: './adminsupport.component.html',
  styleUrls: ['./adminsupport.component.css']
})
export class AdminsupportComponent implements OnInit {

  rowDataOriginal: any;
  categorization: string;
  rowData: any;
  gridApi: any;
  gridColumnApi: any;
  activeTab: string;
  prioritization: Prioritization;
  gridOptions: any;
  public modules: Module[] = AllCommunityModules;
  columnDefs: any;
  defaultColDef: { filter: boolean; resizable: boolean; width: number; suppressSizeToFit: boolean; };
  getRowHeight: (params: any) => number;
  sideBar: { toolPanels: (string | { id: string; labelKey: string; labelDefault: string; iconKey: string; toolPanel: string; enablePivot: boolean; })[]; defaultToolPanel: string; };
  constructor(private router: Router,private route:ActivatedRoute,private prioritizationService:PrioritizationService,private modalService: NgbModal)
   {
    this.prioritization=new Prioritization();
  this.gridOptions={
    context:{
      componentParent:this
    }
  }  

    this.columnDefs=this.GetPriorityColumns();

  
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
  contentRef(contentRef: any) {
    throw new Error("Method not implemented.");
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

    });
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
        headerName: 'SNO:',
        field: 'SNO',
        lockPosition: true,
        cellClass: "locked-col",
        valueGetter: "node.rowIndex + 1"
      },
     { 
        headerName: 'ProjectName',
        field: 'projectName',
        filter: true,
        editable: true,
        singleClickEdit: true
        
      },
      { 
        headerName: 'ProjectOwner',
        field: 'projectOwner',
        editable: true,
        singleClickEdit: true
       
      },
      { 
        headerName: 'LINK',
        field: 'LINK',
        sortable: true,
        editable: true,
        cellRenderer: function(params) {
          return '<div><a href="http://localhost:4200/newProject" target="_blank">'+'NEW-Project:Link'+'</a></div>'
        }

      },

      ];

  }


   sitemapUrlRenderer(params) {
    return `<a href="${params.value}" target="_blank">
      <span class="ag-siteMap-icon"></span>
      </a> `;
  }

  onCellValueChanged(params: any){
    console.log(params);
   this.prioritizationService.savePriorDetailsArray(params.data).subscribe(data=>{

   })
        console.log(params);
      }

      onCellValueEditStoped(event){
        console.log(event);

      }
}
