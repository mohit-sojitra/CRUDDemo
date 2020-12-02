import { ModifyRecordComponent } from './modify-record/modify-record.component';
import { RecordListComponent } from './record-list/record-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: RecordListComponent },
  { path : 'recordlist' , component : RecordListComponent},
  { path : 'recordlist/:id' , component : ModifyRecordComponent},
  { path : 'recordlist/new' , component : ModifyRecordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
