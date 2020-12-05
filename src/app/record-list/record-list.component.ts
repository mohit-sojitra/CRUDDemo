import { RecordModel } from './../record.model';
import { RecordMaintainService } from './../record-maintain.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: RecordModel[];
  mySub: Subscription;
  numberofpages: number[];
  activatedPage = 1;
  constructor(private RecordMaintainService: RecordMaintainService) {
    RecordMaintainService.configObservable.subscribe(data => {
      this.numberofpages = Array(data).fill(0).map((x, i) => i + 1);
      console.log(this.numberofpages);
    });
  }
  ngOnInit(): void {
    this.records = this.RecordMaintainService.records;
    this.getRecord(this.activatedPage);
  }
  getRecord(item) {
    this.activatedPage = item;
    this.RecordMaintainService.getRecord(this.activatedPage);
  }
  deleteRecord(i) {
    if (confirm('Are you sure to delete ' + this.records[i].first_name)) {
      console.log('deleting' + this.records[i].first_name);
      this.RecordMaintainService.deleteRecord(this.records[i].id);
      this.records.splice(i, 1);
    }
  }

}
