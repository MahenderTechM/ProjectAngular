import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Module, AllCommunityModules } from '@ag-grid-community/all-modules';
import { PrioritizationService } from 'src/app/services/prioritization.service';
import { CommonService } from 'src/app/services/common.service';
import { ActionItems } from 'src/app/models/ActionItems';

@Component({
  selector: 'app-action-item-popup',
  templateUrl: './action-item-popup.component.html',
  styleUrls: ['./action-item-popup.component.css']
})
export class ActionItemPopupComponent implements OnInit {

  private gridApi;
  model: NgbDateStruct;
  private gridColumnApi;
  closeResult = '';
  public rowSelection;
  rowData:any;
  projectId:number;
  projectName:string;
  params: any;
  m_selectedOwnerList: any[];
  m_filteredOwnerList:any[]=[];
  m_bindOwnerList:any[]=[];
  // actionItem:ActionItem;
  public modules: Module[] = AllCommunityModules;
  actionItems:ActionItems;


  @ViewChild('actionItemModal',null) actionItemModal: any;
  columnDefs = [
    {
      width:50,
      headerName: '#',
      filter:true,
      valueGetter: function(params) {
        return params.node.rowIndex+1;
      },
    }
    ,
    {field: 'applicationOrDescription', headerName:'Action Item',width:160, },
    {field: 'projectOwner',headerName:'Action Owner', width:150, },
    {field: 'comments',headerName:'Comments', width:150,},
    {field: 'projectStatus',headerName:'Action Status', width:140, },
    {field: 'createdDate',headerName:'Created On', width:120, },
    {field: 'nextActionDate',headerName:'Due Date', width:110,},
    // {field: 'priorityName',headerName:'Priority', width:120 },
    // {field: 'deviceType',headerName:'Device Type', width:130 },
      ];

  constructor(private modalService: NgbModal,private prioritizationService:PrioritizationService,
     private commonService: CommonService
    ) { }
  ngAfterViewInit(): void {
    this.modalService.open(this.actionItemModal, {centered: true,size:'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 
  }
  ngOnInit() {
      // this.actionItem=new ActionItem();
        this.prioritizationService.GetActionItemDetails().subscribe(data=>{
        this.rowData=data; 
    });
  }
  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params=params;
    this.actionItems=params.data.ActionItemId;
    this.actionItems=params.data.projectId;
    console.log(this.projectId);
   }
   onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  private getDismissReason(reason: any): string {
    // this.inpData.context.componentParent.updateAccesGroupValue(this.m_accessGroup,this.inpData);
     if (reason === ModalDismissReasons.ESC) {

       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
     }
     
   }
   findUsers(filter: string){    
    this.commonService.FindUsers(filter).subscribe(data=>{      
          this.m_filteredOwnerList=data.splice(0,10);
    });
  }

   onSelectedUsers(event){
    this.m_selectedOwnerList=event; 
   }
}