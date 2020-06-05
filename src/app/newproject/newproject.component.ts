import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDate, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ProjectDetails } from '../shared/models/ProjectDetails';
import { ActivatedRoute } from '@angular/router';
// import { ProjectService } from '../services/project.service';
// import { ProjectFactory } from './project.factory';
// import { DeviceType } from './device-type.model';
import { NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { NotifierService } from "angular-notifier";
// import { TechNode } from './tech-node';
// import { Customer } from './customer';
// import { InvolvedBU } from './involved-bu';

import { stringify } from 'querystring';
import { CommonService } from '../services/common.service';
import { PeoplePickerComponent } from '../people-picker/people-picker.component';
import { NewprojectService } from '../services/newproject.service';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css']
})
export class NewprojectComponent implements OnInit {
  m_projectDetails: ProjectDetails;
  pickerType: string='multiple';
  m_showLoader: boolean=false;
  currentDate = new NgbDate((new Date()).getFullYear(),(new Date()).getMonth()+1,(new Date()).getDate());  
  m_filteredRequestorList: any[]=[];
  m_filteredCustomerList: any[]=[];
  m_filteredProgramLeadList: any[]=[];
  m_filteredTechLeadList: any[]=[];
  

  customerList:[];
  deviceTypeList:[];
  marketList:[];
  businessList:[];
  customerTypeList:[];
  fastTrackList:[];

 
  // status: any;
  // disabled = false;
  // ShowFilter = false;
  // limitSelection = false;
  // cities: any = [];

  selectedDeviceType: any = [];
  selectedCustomer: any=[];
  model:NgbDateStruct;
 

  customerDropDownSettings: any = {};
  deviceTypeDropDownSettings: any = {};
  marketDropDownSettings: any = {};
  businessDropDownSettings: any = {};
  customerTypeDropDownSettings: any = {}; 
  fastTrackDropDownSettings: any = {};

  @ViewChild(PeoplePickerComponent, {static:false}) peoplePicker:PeoplePickerComponent;
  
  //<<For Validation
  validationReport: { [key: string]: boolean } = {};
  //For Validation>>

  //<<FontAwesome - Icons
  faCalendar = faCalendar;
  selectedMarket: any;
  selectedBusiness:any;
  selectedFastTrack:any;
  selectedCustomerType:any;
  selectedfastTrack:any;
  ProjectCode:any;
  ProjectDescription:any;
  RequestedDate:any;
  CustomerLead:any;

 

  //FontAwesome - Icons>>
  
  constructor(private route:ActivatedRoute, private commonService: CommonService,private newProjectService:NewprojectService,private calender:NgbCalendar) {
      this.m_projectDetails = new ProjectDetails();
   }

  ngOnInit() {    
    this.m_projectDetails.CreatedDate= this.currentDate;
    this.model=this.calender.getToday();
    this.RequestedDate=this.model;
    this.customerDropDownSettings = this.dropDownSettings('customer','customer',true);
    this.deviceTypeDropDownSettings = this.dropDownSettings('deviceType','deviceType',true);
    this.marketDropDownSettings = this.dropDownSettings('market','market', true);
    this.businessDropDownSettings = this.dropDownSettings('business','business');
    this.customerTypeDropDownSettings = this.dropDownSettings('customerType','customerType'); 
    this.fastTrackDropDownSettings = this.dropDownSettings('fastTrack','fastTrack');   

    this.newProjectService.GetLookup().subscribe(data=>{
      this.customerList= data["customerViewModels"].map(val=>{
        return {item_id:val.customerId,item_text:val.customerName};
      });      
      this.deviceTypeList= data["deviceViewModels"].map(val=>{
        return {item_id:val.deviceId,item_text:val.deviceName};
      });      
      this.marketList= data["marketViewModels"].map(val=>{
        return {item_id:val.marketId,item_text:val.marketName};
      });      
      this.businessList= data["bussinessViewModels"].map(val=>{
        return {item_id:val.businessId,item_text:val.businessName};
      });      
      this.customerTypeList= data["customerTypeViewModels"].map(val=>{
        return {item_id:val.customerTypeId,item_text:val.customerTypeName};
      });  
      this.fastTrackList= data["fastTrackViewModels"].map(val=>{
        return {item_id:val.fastTrackId,item_text:val.fastTrackName};
      });       
    })

  }
  dropDownSettings(item_id: string, item_text: string, singleSelection: boolean=false): any{
    return {
      singleSelection: singleSelection,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  // onItemSelect(item: any, dropDown: string) {       
  //   if(dropDown==='customer'){
  //     this.m_projectDetails.Customer = this.selectedCustomer.map((e)=>{return e.customer;}).join(',');
  //   }
  //   else if(dropDown==='device'){
  //     this.m_projectDetails.Device = this.selectedDevice.map((e)=>{return e.device;}).join(',');
  //   }
  //   else if(dropDown==='market'){
  //     this.m_projectDetails.MarketList = this.selectedMarket.map((e)=>{return e.Market;}).join(',');
  //   }
  //   else if(dropDown==='fastTrack'){
  //     this.m_projectDetails.FastTrack = this.selectedFastTrack.map((e)=>{return e.FastTrack;}).join(',');
  //   }

  // }
  // onDeSelect (item: any, dropDown: string){
  //   if(dropDown==='customer'){
  //     this.m_projectDetails.Customer = this.selectedCustomer.map((e)=>{return e.customer;}).join(',');
  //   }
  //   else if(dropDown==='device'){
  //     this.m_projectDetails.Device = this.selectedDevice.map((e)=>{return e.device;}).join(',');
  //   }
  //   else if(dropDown==='market'){
  //     this.m_projectDetails.MarketList = this.selectedMarket.map((e)=>{return e.Market;}).join(',');
  //   }
  //   else if(dropDown==='fastTrack'){
  //     this.m_projectDetails.FastTrack = this.selectedFastTrack.map((e)=>{return e.FastTrack;}).join(',');
  //   }
  // }
  // onSelectAll(items: any, dropDown: string) {
  //   if(dropDown==='customer'){
  //     this.m_projectDetails.Customer = this.selectedCustomer.map((e)=>{return e.customer;}).join(',');
  //   }
  //   else if(dropDown==='device'){
  //     this.m_projectDetails.Device = this.selectedDevice.map((e)=>{return e.device;}).join(',');
  //   }
  //   else if(dropDown==='market'){
  //     this.m_projectDetails.MarketList = this.selectedMarket.map((e)=>{return e.Market;}).join(',');
  //   }
  //   else if(dropDown==='fastTrack'){
  //     this.m_projectDetails.FastTrack = this.selectedFastTrack.map((e)=>{return e.FastTrack;}).join(',');
  //   }
  // }

 // isValid(): boolean{
    
    // this.validationReport["ProjectDescription"]=(this.m_projectDetails.ProjectDescription !==undefined && this.m_projectDetails.ProjectDescription.length>0);
    // this.validationReport["RequestedDate"]=(this.m_projectDetails.RequestedDate !==undefined && this.m_projectDetails.RequestedDate !==null && Object.keys(this.m_projectDetails.RequestedDate).length>0);
    // this.validationReport["RequestorList"]=(this.m_projectDetails.RequestorList !==undefined && this.m_projectDetails.RequestorList.length>0);
    // this.validationReport["Device"]=(this.m_projectDetails.DeviceList !==undefined && this.m_projectDetails.DeviceList.length>0);
    // this.validationReport["Market"]=(this.m_projectDetails.MarketList !==undefined && this.m_projectDetails.MarketList.length>0);
    // this.validationReport["FastTrack"]=(this.m_projectDetails.FastTrackList !==undefined && this.m_projectDetails.FastTrackList.length>0);
    // this.validationReport["BusinessUnit"]=(this.m_projectDetails.BusinessUnitList !==undefined && this.m_projectDetails.BusinessUnitList.length>0);    
    // this.validationReport["Customer"]=(this.m_projectDetails.CustomerId !==undefined && this.m_projectDetails.CustomerId !==null && this.m_projectDetails.CustomerId !== '');            
    // return this.validatingField();
  //}
  validatingField(): boolean{
    let value=true;
    for (let key in this.validationReport) {      
      if(this.validationReport[key]===false || this.validationReport[key]===undefined)
        value = false;
        break;      
    }
    console.log(value);
    return value;
  }


  resetForm(){   
    debugger;
    this.ProjectCode="";
    this.ProjectDescription="";
    this.CustomerLead="";
    this.selectedDeviceType="";
    this.selectedMarket="",
    this.selectedBusiness="",
    this.selectedCustomerType="";
    this.selectedfastTrack="";
    this.selectedCustomer="";
    this.peoplePicker.resetControl();
    this.m_filteredCustomerList=[];
    this.m_filteredProgramLeadList=[];
    this.m_filteredRequestorList=[];
    this.m_filteredTechLeadList=[];

  }

  onSelectedUsers(event,type){
    if(type=='requestor'){
    this.m_projectDetails.CreatedBy=event.map((e)=>{return e.ntId;}).join(',');
  }
    if(type=='programLead'){
    this.m_projectDetails.ProgramLead=event.map((e)=>{return e.ntId;}).join(',');
  }
    if(type=='techLead'){
    this.m_projectDetails.TechLead=event.map((e)=>{return e.ntId;}).join(',');
  }
    if(type=='customerLead'){
    this.m_projectDetails.CustomerLead=event.map((e)=>{return e.ntId;}).join(',');
  }
  }

  findUsers(filter: string,type:string){ 
    if(type=='customerLead'){
    this.commonService.FindUsers(filter).subscribe(data=>{      
      this.m_filteredCustomerList=data;
      this.m_filteredCustomerList = this.m_filteredCustomerList.splice(0,10);      
    });
  }
    if(type=='techLead'){
    this.commonService.FindUsers(filter).subscribe(data=>{      
      this.m_filteredTechLeadList=data;
      this.m_filteredTechLeadList = this.m_filteredTechLeadList.splice(0,10);      
    });
  }
    if(type=='programLead'){
    this.commonService.FindUsers(filter).subscribe(data=>{      
      this.m_filteredProgramLeadList=data;
      this.m_filteredProgramLeadList = this.m_filteredProgramLeadList.splice(0,10);      
    });
  }
    if(type=='requestor'){
    this.commonService.FindUsers(filter).subscribe(data=>{      
      this.m_filteredRequestorList=data;
      this.m_filteredRequestorList = this.m_filteredRequestorList.splice(0,10);      
    });
  }
  }

  saveProjectDetails(){
    debugger;
    let newProject=new ProjectDetails();
    newProject.Customer=this.selectedCustomer[0].item_text;
    newProject.Device=this.selectedDeviceType[0].item_text;
    newProject.Market=this.selectedMarket[0].item_text;
    newProject.FastTrack=this.selectedFastTrack;
    newProject.CustomerType=this.selectedCustomerType[0].item_text;
    newProject.BusinessModel=this.selectedBusiness[0].item_text;
    newProject.ProjectCode=this.ProjectCode;
    newProject.ProjectName=this.ProjectDescription;
    newProject.CreatedDate=this.model.month+'-'+this.model.day+'-'+this.model.year;
    newProject.CreatedBy=this.m_projectDetails.CreatedBy;
    newProject.ProgramLead=this.m_projectDetails.ProgramLead;
    newProject.TechLead=this.m_projectDetails.TechLead;
    newProject.CustomerLead=this.m_projectDetails.CustomerLead;
    console.log(newProject);
    this.newProjectService.CreateNewProjectList(newProject).subscribe((response)=>{
      console.log(response); 
      
     });
    }
}
