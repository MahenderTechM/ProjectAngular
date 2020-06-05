import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrioritizationComponent } from './prioritization/prioritization.component';
import { HomeComponent } from './home/home.component';
import { NewprojectComponent } from './newproject/newproject.component';
import { PostcommentsComponent } from './postcomments/postcomments.component';
import { ProjectactionsComponent } from './projectactions/projectactions.component';
import { AdminsupportComponent } from './adminsupport/adminsupport.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'newProject', component: NewprojectComponent },
  { path: 'Prioritization', component: PrioritizationComponent },
  { path: 'PostComments', component: PostcommentsComponent },
  { path: 'ProjectActions', component: ProjectactionsComponent },
  { path: 'AdminSupport', component: AdminsupportComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents=[PrioritizationComponent]