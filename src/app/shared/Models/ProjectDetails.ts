import { BaseModel } from '../BaseModel';
 
export class ProjectDetails extends BaseModel{
    ProjectCode:string;
    ProjectName: string;
    CreatedDate: any;
    CreatedBy:string;    
    CustomerLead: string;
    ProgramLead:string;
    TechLead:string;
    Customer:string;
    CustomerType:String;
    Market: string;
    Device:string;
    BusinessModel: string;
    FastTrack: string;
    ProjectDescription: string;
   
}