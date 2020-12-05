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

  createRecord(firstName: string, lastName: string) {
    const record: RecordModel = {
      id: null,
      first_name: firstName,
      last_name: lastName,
      avatar: '',
      email: ''
    };
    this.http.post(
      this.apiUrl,
      record
    ).subscribe(responce => {
      console.log(responce);
    });
  }

  getRecord(pageNumber) {
    this.records.length = 0;
    this.http.get(
      this.apiUrl,
      {
        params: {
          page: pageNumber
        }
      }
    ).subscribe(responce => {
      const obj = responce['data'];
      this.configObservable.next(responce['total_pages']);
      this.records.push(...obj);
      console.log(this.records);
    });
  }

  UpdateRecord(updatingRecordId: number, firstName: string, lastName: string) {
    const record: RecordModel = {
      first_name: firstName,
      last_name: lastName,
      avatar: '',
      id: updatingRecordId,
      email: ''
    };
    this.http.put(
      this.apiUrl + updatingRecordId,
      record
    ).subscribe(responce => {
      console.log(responce);
    });
  }

  deleteRecord(index: any) {
    this.http.delete(
      this.apiUrl + index
    ).subscribe(() => { console.log('Record deleted from server') });

  }

}
