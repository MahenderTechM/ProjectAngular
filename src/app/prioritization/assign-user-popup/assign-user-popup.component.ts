

import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PrioritizationService } from '../../services/prioritization.service';
import { CommonService } from 'src/app/services/common.service';
import { AccessDetails } from '../../models/access-details';
import { User } from 'src/app/common/user';

import { AccessDetailBundle } from '../../models/access-detail-bundle';

@Component({
  selector: 'app-assign-user-popup',
  templateUrl: './assign-user-popup.component.html',
  styleUrls: ['./assign-user-popup.component.css']
})
export class AssignUserPopupComponent implements OnInit,AfterViewInit {

  closeResult = '';
  inpData:any;
  modalTitle:string;
  value:string;
  projectId: number;
  projectName:string;
  disabled:boolean=false;
  m_projectDescription: string;
  
  //<<AccessGroup
  accessDetailBundle : AccessDetailBundle;
  accessGroupDropDownSettings: object = {}; 
  accessGroupList:any;
  m_accessGroup:string;
  pickerType: string='multiple'; // People picker type [single|multiple]
  
  m_selectedSalesGroupList: User[];
  m_filteredSalesGroupList:any[]=[];
  m_bindSalesGroupList:any[]=[];
 
  m_selectedIndividualAccessList: User[];
  m_filteredIndividualAccessList:any[]=[];
  m_bindIndividualAccessList:any[]=[];
 
  m_selectedSCLAEngineersList: User[];
  m_filteredSCLAEngineersList:any[]=[];
  m_bindSCLAEngineersList:any[]=[];
 
  m_selectedProjectOwnerList: User[];
  m_filteredProjectOwnerList:any[]=[];
  m_bindProjectOwnerList:any[]=[];
 
  accessDetails : AccessDetails; 
  m_showAccessGroupLoader:boolean=false;

  //AccessGroup>>
  m_customerId:number = 1000;

 
  @ViewChild('accessGroup',null) accessGroup: any;
  
  constructor(private modalService: NgbModal, private prioritizationService:PrioritizationService, 
    private commonService: CommonService) {
      this.accessDetails=new AccessDetails();
  }  


  ngAfterViewInit(): void {
    this.modalTitle=this.inpData.colDef.headerName;
    debugger;
    this.modalService.open(this.accessGroup, {centered: true,size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }); 
  
}

  ngOnInit(): void {
    this.projectId = this.inpData.data.projectId;  
    debugger;      
    this.m_projectDescription = this.inpData.data.projectDescription;
  }


  dropDownSettings(idField: string, displayField: string, singleSelection: boolean=false): any{
    return {
      singleSelection: singleSelection,
      idField: idField,
      textField: displayField,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  private getDismissReason(reason: any): string {
   // this.inpData.context.componentParent.updateAccesGroupValue(this.m_accessGroup,this.inpData);
    if (reason === ModalDismissReasons.ESC) {
      this.value=this.inpData.value;
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.value=this.inpData.value;
      return 'by clicking on a backdrop';
    } else {
      this.value=this.projectName;
    }
  }
  refresh(params: any): boolean {
    throw new Error("Method not implemented.");
  }
 
  agInit(params: import("ag-grid-community").ICellRendererParams): void {
 
   this.inpData=params;
   this.projectName=params.value;
  //  this.projectId=params.data.projectId;
  }

  afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  }
  getValue(): any {
   this.value=this.projectName;
   return this.value;
 }
 onItemSelect(item: any, dropDown: string) {       
   if(dropDown==='accessGroup'){     

   }
 }
 onDeSelect (item: any, dropDown: string){
   if(dropDown==='accessGroup'){

   }

 }
 onSelectAll(items: any, dropDown: string) {
   if(dropDown==='accessGroup'){

   }
   
 }

  isPopup(): boolean {
    return true;
  }
  findUsers(filter: string,userType: string){    
    this.commonService.FindUsers(filter).subscribe(data=>{      
      switch(userType){
        case 'individualAccessGroup':
          this.m_filteredIndividualAccessList=data.splice(0,10);
          break;
        case 'sclaEngineersGroup':
          this.m_filteredSCLAEngineersList=data.splice(0,10);
          break;
        case 'projectOwnerGroup':
          this.m_filteredProjectOwnerList=data.splice(0,10);
          break;
      }      
    });
  }
  onSelectedUsers(event , userType: string){
    switch(userType){
      case 'individualAccessGroup':
        // this.m_selectedIndividualAccessList=event.map((e)=>{return e.ntId;}).join(',');    
        this.m_selectedIndividualAccessList=event;    
        break;
      case 'sclaEngineersGroup':
        // this.m_selectedSCLAEngineersList=event.map((e)=>{return e.ntId;}).join(',');        
        this.m_selectedSCLAEngineersList=event; 
        break;
      case 'projectOwnerGroup':
        // this.m_selectedProjectOwnerList=event.map((e)=>{return e.ntId;}).join(',');        
        this.m_selectedProjectOwnerList=event; 
        break;
    }
  }
  onSaveAccessDetails(){  
    // console.log(this.m_accessGroup);  
    this.accessDetails.AccessGroups=this.m_accessGroup;
    this.accessDetails.IndividualAccess=this.m_selectedIndividualAccessList;
    this.accessDetails.SCLAMembers=this.m_selectedSCLAEngineersList;
    this.accessDetails.ProjectOwner=this.m_selectedProjectOwnerList;
    this.accessDetails.ProjectId = this.projectId;
    console.log(this.accessDetails);
     this.prioritizationService.onSaveAccessDetails(this.accessDetails).subscribe((response)=>{
      console.log(response); 
    });
  }

}
