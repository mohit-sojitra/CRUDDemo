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
  records: RecordModel[] = [];
  mySub: Subscription;
  numberofpages: number[];
  activatedPage = 1;
  constructor(private RecordMaintainService: RecordMaintainService) { }
  ngOnInit(): void {
    this.records = this.RecordMaintainService.records;
    this.getRecord(this.activatedPage);
  }
  getRecord(pagenumber: number) {
    this.activatedPage = pagenumber;
    this.RecordMaintainService.getRecord(this.activatedPage).subscribe(responce => {
      this.records.length = 0;
      const obj = responce['data'];
      this.numberofpages = Array(responce['total_pages']).fill(0).map((x, i) => i + 1);
      this.records.push(...obj);
      console.log(this.records);
    });;
  }
  deleteRecord(i: number) {
    if (confirm('Are you sure to delete ' + this.records[i].first_name)) {
      this.RecordMaintainService.deleteRecord(this.records[i].id).subscribe(() => {
        console.log('Deleted');
      });
      this.records.splice(i, 1);
    }
  }
}
