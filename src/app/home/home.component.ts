import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrioritizationService } from '../services/prioritization.service';
import { Prioritization } from '../models/prioritization';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  AllCommunityModules,Module  } from "@ag-grid-community/all-modules";
import { HomeService } from '../services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  rowDataOriginal: any;
  categorization: string;
  rowData:any;
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
  constructor(private router: Router,private route:ActivatedRoute,private modalService: NgbModal,private homeService:HomeService)
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
    
    this.homeService.GetHomeList().subscribe(data=>{
      console.log(data);
      this.rowData=data;
    })
     //this.prioritizationService.GetPrioritizationDetails().subscribe(data=>this.rowData=data);
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
        width:80,
        headerName: "Site Url",
        field: "siteUrl",
        cellRenderer: function(params) {
          // return '<a href="https://www.google.com" target="_blank"> <img border="0" alt="W3Schools" src="./assets/images/icon-sort.png" width="25" height="25"> '+ params.value+'</a>'
          return '<a href="https://www.w3schools.com/html/"><img border="0" alt="W3Schools" src="./assets/images/sitemap.png" width="20" height="20"></a>'
        }
        },
        {
          width:120,
          headerName: 'ProjectCode',
          field: 'projectCode',
        },
        {
          width:280,
          headerName: 'Application/Description',
          field: 'applicationOrDescription',
  
        },
      {
        width:100,
        headerName: 'Engage',
        field: 'engage'

      },
      {
        width:100,
        headerName: 'Scope',
        field: 'scope',

  
      },
      {  width:100,
        headerName: 'Propose',
        field: 'propose',

      },
      { width:115,
        headerName: 'CTN Approvals',
        field: 'ctnApprovals',
  

      },
      {
        width:120,
      headerName: 'CTC Approved',
      field: 'ctcApproved',
  
    },
    {
      width:120,
      headerName: 'SignedExecute',
      field: 'signedExecute'
    },

      ];

  }


   sitemapUrlRenderer(params) {
    return `<a href="${params.value}" target="_blank">
      <span class="ag-siteMap-icon"></span>
      </a> `;
  }

  onCellValueChanged(params: any){
    debugger;
        console.log(params);
      }
      onCellValueEditStoped(event){
        console.log(event);

      }

}
