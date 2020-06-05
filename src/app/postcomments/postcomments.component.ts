import { Component, OnInit } from '@angular/core';
import { Prioritization } from '../models/prioritization';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import { ActivatedRoute, Router } from '@angular/router';
import { PrioritizationService } from '../services/prioritization.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellEditDatePickerComponent } from '../prioritization/cell-edit-date-picker/cell-edit-date-picker.component';

@Component({
  selector: 'app-postcomments',
  templateUrl: './postcomments.component.html',
  styleUrls: ['./postcomments.component.css']
})
export class PostcommentsComponent implements OnInit {

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
     this.prioritizationService.GetProjectList().subscribe(data=>this.rowData=data);
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
   
      { width:150,
        headerName: 'SNO:',
        field: 'SNO',
        lockPosition: true,
        cellClass: "locked-col",
        valueGetter: "node.rowIndex + 1"
      },
      {  width:200,
        headerName: 'ProjectSite#',
        field: 'projectSite',
        filter: true

      },
      {width:200,
        headerName: 'ProjectID',
        field: 'projectId',
        editable: true,
        singleClickEdit: true
      },
      {width:250,
        headerName: 'ProjectStatus',
        field: 'projectStatus',
        sortable: true,
        editable: true,
        singleClickEdit: true,
        cellEditor : 'agSelectCellEditor',
        cellEditorParams: function(params) {
        var selectedCountry = params.data.comments;
        return {
            values: ['Active','Archive','Hold','Closed','New Project']
        };
       }

      },
      {width:300,
        headerName: 'Comments',
        field: 'comments',
        sortable: true,
        editable: true,
        

      },
      {width:250,
        headerName: 'CreatedDate',
        field: 'createdDate',
        editable: true,
        singleClickEdit: true,
        cellEditorFramework:CellEditDatePickerComponent,
        cellRenderer: (params) => {
          if (params && params.value) {
            return params.value;
          }
        },


      },
      {width:250,
        headerName: 'CreatedBy',
        field: 'createdBy',
        editable: true,
        singleClickEdit: true


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
