import { RecordModel } from './../record.model';
import { RecordMaintainService } from './../record-maintain.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-modify-record',
  templateUrl: './modify-record.component.html',
  styleUrls: ['./modify-record.component.css']
})
export class ModifyRecordComponent implements OnInit {

  @ViewChild('form', { static: true }) formData: NgForm;
  firstName: string;
  lastName: string;
  updateMode = false;
  updatingRecord: RecordModel;
  updatingRecordId: number;
  constructor(private RecordMaintainService: RecordMaintainService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      this.updatingRecordId = this.route.snapshot.params.id;
      this.updatingRecord = this.RecordMaintainService.records[this.updatingRecordId];
      console.log(this.updatingRecord);
      this.updateMode = true;
      setTimeout(() => {
        this.formData.setValue({
          first: this.updatingRecord.first_name,
          last: this.updatingRecord.last_name
        });
      });
    }
  }

  onSubmit() {
    this.firstName = this.formData.value.firstName;
    this.lastName = this.formData.value.lastName;
    if (!this.updateMode) {
      this.RecordMaintainService.createRecord(this.firstName, this.lastName);
      this.router.navigate(['/recordlist']);
    } else {
      this.RecordMaintainService.UpdateRecord(this.updatingRecordId,this.firstName, this.lastName);
      this.updateMode = false;
      this.router.navigate(['/recordlist']);
    }
  }

  onCancel() {
    this.updateMode = false;
    this.formData.reset();
    this.router.navigate(['/recordlist']);
  }
}
