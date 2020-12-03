import { RecordModel } from './../record.model';
import { RecordMaintainService } from './../record-maintain.service';
import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: RecordModel[];
  mySub: Subscription;
  numberofpages: number[] = [];
  activatedPage: number = 1;
  //numbers = Array(5).fill(0).map((x,i)=>i);
  constructor(private RecordMaintainService: RecordMaintainService) {
    RecordMaintainService.configObservable.subscribe(data => {
      // this.numberofpages = data;
      this.numberofpages = Array(data).fill(0).map((x, i) => i + 1);
      console.log(this.numberofpages);
    })
  }

  ngOnInit(): void {
    this.RecordMaintainService.getRecord();
    this.records = this.RecordMaintainService.records;
    // this.numberofpages = RecordModel.numberofpage;
    // console.log(RecordModel.numberofpage);
  }

  updateTable(item) {
    this.activatedPage = item;
    console.log("load " + item);
    this.RecordMaintainService.updateTable(item);
  }
  deleteRecord(i) {
    if (confirm("Are you sure to delete " + this.records[i].firstName)) {
      console.log('deleting' + this.records[i].firstName);
      this.RecordMaintainService.deleteRecord(this.records[i].id);
      this.records.splice(i, 1);
    }
  }

}
