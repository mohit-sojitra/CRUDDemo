import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordListComponent } from './record-list/record-list.component';
import { ModifyRecordComponent } from './modify-record/modify-record.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordListComponent,
    ModifyRecordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
