import { ModifyRecordComponent } from './modify-record/modify-record.component';
import { RecordListComponent } from './record-list/record-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'recordlist' , component : RecordListComponent},
  { path: 'recordlist/new', component: ModifyRecordComponent},
  { path : 'recordlist/:id' , component : ModifyRecordComponent},
  { path: '**', redirectTo: '/recordlist' } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
