import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PrioritizationService } from 'src/app/services/prioritization.service';
import { AllCommunityModules, Module } from '@ag-grid-community/all-modules';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cnt-approvals',
  templateUrl: './cnt-approvals.component.html',
  styleUrls: ['./cnt-approvals.component.css']
})
export class CntApprovalsComponent implements OnInit {

  private gridApi;
  model: NgbDateStruct;
  private gridColumnApi;
  closeResult = '';
  public rowSelection;
  rowData:any;
  projectId:number;
  projectName:string;
  params: any;
  public modules: Module[] = AllCommunityModules;

  m_selectedOwnerList: any[];
  m_filteredOwnerList:any[]=[];
  m_bindOwnerList:any[]=[];

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
    {field: 'CTN Feedback', headerName:'CTN Feedback',width:160, },
    {field: 'ApprovalSummary',headerName:'Approval Summary', width:150, },
    {field: 'Approvers',headerName:'Approvers', width:150,},
    {field: 'ApprovalDate',headerName:'Approval Date', width:140, },
    {field: 'createdDate',headerName:'Created On', width:120, },
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
        this.prioritizationService.GetCtnApprovalDetails(this.projectId).subscribe(data=>{
        this.rowData=data;
    });
  }
  agInit(params: import("ag-grid-community").ICellRendererParams): void {
    this.params=params;
    this.projectId=params.data.projectId;
    this.projectName=params.data.projectDescription;
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