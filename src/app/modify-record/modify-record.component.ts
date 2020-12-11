import { Subscription } from 'rxjs';
import { RecordModel } from './../record.model';
import { RecordMaintainService } from './../record-maintain.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-modify-record',
  templateUrl: './modify-record.component.html',
  styleUrls: ['./modify-record.component.css']
})
export class ModifyRecordComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) formData: NgForm;
  firstName: string;
  lastName: string;
  updateMode = false;
  updatingRecord: RecordModel;
  updatingRecordId: number;
  reloadSub: Subscription;
  constructor(private RecordMaintainService: RecordMaintainService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.reloadSub = this.route.params.subscribe(routeParams => {
      if (routeParams.id === 'new') this.ngOnInit;
    });
    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      this.updatingRecordId = this.route.snapshot.params.id;
      this.updatingRecord = this.RecordMaintainService.records[this.updatingRecordId];
      console.log(this.updatingRecord);
      this.updateMode = true;
      setTimeout(() => {
        this.formData.setValue({
          first_name: this.updatingRecord.first_name,
          last_name: this.updatingRecord.last_name
        });
      });
    }
  }

  onSubmit(formD: NgForm) {
    this.firstName = this.formData.value.first_name;
    this.lastName = this.formData.value.last_name;
    if (!this.updateMode) {
      this.RecordMaintainService.createRecord(this.firstName, this.lastName)
        .subscribe(responce => {
          console.log(responce);
        });
      this.router.navigate(['/recordlist']);
    } else {
      this.RecordMaintainService.UpdateRecord(this.updatingRecordId, this.firstName, this.lastName)
        .subscribe(responce => {
          console.log(responce);
        });
      this.updateMode = false;
      this.router.navigate(['/recordlist']);
    }
  }

  onCancel() {
    this.updateMode = false;
    this.formData.reset();
    this.router.navigate(['/recordlist']);
  }
  ngOnDestroy() {
    this.reloadSub.unsubscribe();
  }
}
