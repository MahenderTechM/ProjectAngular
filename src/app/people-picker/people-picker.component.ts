import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {faUserCircle,faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-people-picker',
  templateUrl: './people-picker.component.html',
  styleUrls: ['./people-picker.component.css']
})
export class PeoplePickerComponent implements OnInit {

  @Input() jsonData: any;
  @Input() pickerType: string;
  @Input() filteredUserList: any[]=[];  
  @Input() 
  public set bindSelectedUsers(val: any[]) {    
    this.m_selectedUserList = val.length>0?val:[];    
  }
  @Output() selectedUsers = new EventEmitter<any>();
  @Output() filterText = new EventEmitter<string>();
  m_userData: any;
  userDetailsList: any[]=[];
  displaySuggestion: boolean=false;
  m_userName: string;
 
  m_selectedUserList: any[]=[];
  @ViewChild('ppListItem',{static: false}) ppListItem: ElementRef;
  @ViewChild('ppInput',{static: false}) ppInput: ElementRef;
  //<<FontAwesome - Icons
  faUserCircle = faUserCircle;
  faTimesCircle=faTimesCircle;
  //FontAwesome - Icons>>
  constructor( private renderer: Renderer2) {
    
   }
 
  ngOnInit() {
  }  
  onKeyUp(event){
    if(this.m_userName.length>2){
      this.displaySuggestion=true;
      // this.getJsonData(event.target.value);
      this.filterText.emit(this.m_userName);
      this.renderer.listen('window', 'click',(e:Event)=>{
        /**
         * Only run when toggleButton is not clicked
         * If we don't check this, all clicks (even on the toggle button) gets into this
         * section which in the result we might never see the menu open!
         * And the menu itself is checked here, and it's where we check just outside of
         * the menu and button the condition abbove must close the menu
         */
          if(this.ppListItem!==undefined && this.ppInput !==undefined 
            && e.target !== this.ppListItem.nativeElement
            && e.target !== this.ppInput.nativeElement){
              this.displaySuggestion=false;
          }
      });
    }
    else{
      this.userDetailsList=[];
      this.m_userData=[];
      this.displaySuggestion=false;
    }
  }
  // getJsonData(searchText: string){    
  //   this.GetUserDetails().subscribe(data=>{
  //     this.userDetailsList =[data];      
  //     this.m_userData=this.userDetailsList[0].filter(el=> el.name.toLowerCase().indexOf(searchText.toLowerCase())!==-1).slice(0,5)});       
  //     return this.m_userData;
  // }
 
  selectedUser(data){        
    if(this.pickerType==='single'){
      this.m_selectedUserList.length>0?this.m_selectedUserList[0]=data:this.m_selectedUserList.push(data);
    }else{
      this.m_selectedUserList.push(data);
    }
    
    this.selectedUsers.emit(this.m_selectedUserList);    
    this.displaySuggestion=false;
    this.m_userName="";
  }
  removeSelectedUser(index){    
    this.m_selectedUserList.splice(index,1);
    this.selectedUsers.emit(this.m_selectedUserList);
  } 
  resetControl(){
    this.m_selectedUserList=[];  
  }
 }