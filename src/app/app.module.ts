import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule ,RoutingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
//  import { AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from '@ag-grid-community/angular';
import { PrioritizationService } from "./services/prioritization.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectDropdownComponent } from './shared/multi-select-dropdown/multi-select-dropdown.component';
import { CellEditDatePickerComponent } from './prioritization/cell-edit-date-picker/cell-edit-date-picker.component';
import { DateFormatter } from './shared/date-formatter.utilities';
import { NewprojectComponent } from './newproject/newproject.component';
import { PostcommentsComponent } from './postcomments/postcomments.component';
import { ProjectactionsComponent } from './projectactions/projectactions.component';
import { HomeComponent } from './home/home.component';
import { AdminsupportComponent } from './adminsupport/adminsupport.component';
import { ActionItemPopupComponent } from './prioritization/action-item-popup/action-item-popup.component';
import { CntApprovalsComponent } from './prioritization/cnt-approvals/cnt-approvals.component';
import { PeoplePickerComponent } from './people-picker/people-picker.component';
import { AssignUserPopupComponent } from './prioritization/assign-user-popup/assign-user-popup.component';
import { HomeService } from './services/home.service';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    MultiSelectDropdownComponent,
    CellEditDatePickerComponent,
    NewprojectComponent,
    PostcommentsComponent,
    ProjectactionsComponent,
    HomeComponent,
    AdminsupportComponent,
    ActionItemPopupComponent,
    CntApprovalsComponent,
    PeoplePickerComponent,
    AssignUserPopupComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    AgGridModule.withComponents([]),
    NgMultiSelectDropDownModule.forRoot(),
    ],  
  exports:[ReactiveFormsModule,CellEditDatePickerComponent,MultiSelectDropdownComponent],
  providers: [PrioritizationService,HomeService,{ provide: NgbDateParserFormatter, useClass: DateFormatter }], 
  entryComponents:[CellEditDatePickerComponent,MultiSelectDropdownComponent,
    ActionItemPopupComponent,CntApprovalsComponent,AssignUserPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
