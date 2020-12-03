import { RecordModel } from './record.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecordMaintainService {
  apiUrl = 'https://reqres.in/api/users/';
  public records: RecordModel[] = [];
  public configObservable = new Subject<number>();

  constructor(private http: HttpClient) { }

  getRecord() {
    this.records.length = 0;
    this.http.get(
      this.apiUrl
    ).subscribe(responce => {
      const obj = responce['data'];
      this.configObservable.next(responce['total_pages']);
      // tslint:disable-next-line: forin
      for (const i in obj) {
        this.records.push(new RecordModel(obj[i]['id'], obj[i]['first_name'], obj[i]['last_name'], obj[i]['avatar']));
      }
      console.log(this.records);
    });
  }

  addRecord(firstName: string, lastName: string) {
    const record = new RecordModel('', firstName, lastName, '');
    this.http.post(
      this.apiUrl,
      record
    ).subscribe(responce => {
      console.log(responce);
    });
  }

  updateTable(item: any) {
    this.records.length = 0;
    this.http.get(
      this.apiUrl,
      {
        params: {
          'page': item
        }
      }
    ).subscribe(responce => {
      const obj = responce['data'];
      this.configObservable.next(responce['total_pages']);
      // tslint:disable-next-line: forin
      for (const i in obj) {
        this.records.push(new RecordModel(obj[i]['id'], obj[i]['first_name'], obj[i]['last_name'], obj[i]['avatar']));
      }
      console.log(this.records);
    });
  }

  deleteRecord(index: any) {
    this.http.delete(
      this.apiUrl + index
    ).subscribe(() => { console.log("Record deleted from server") });

  }

  UpdateRecord(updatingRecordId: number, firstName: string, lastName: string) {
    const record = new RecordModel('', firstName, lastName, '');
    this.http.put(
      this.apiUrl + updatingRecordId,
      record
    ).subscribe(responce => {
      console.log(responce);
    });
  }


}
