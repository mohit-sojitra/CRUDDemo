import { RecordModel } from './record.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecordMaintainService {
  apiUrl = 'https://reqres.in/api/users/';
  public records: RecordModel[] = [];
  constructor(private http: HttpClient) { }
  
  createRecord(firstName: string, lastName: string): Observable<string> {
    console.log('Creating Record');
    const record: RecordModel = {
      id: null,
      first_name: firstName,
      last_name: lastName,
      avatar: '',
      email: ''
    };
    return this.http.post<string>(
      this.apiUrl,
      record
    )
  }

  getRecord(pageNumber): Observable<any> {
    console.log('Getting Records');
    return this.http.get(
      this.apiUrl,
      {
        params: {
          page: pageNumber
        }
      }
    )
  }

  UpdateRecord(updatingRecordId: number, firstName: string, lastName: string): Observable<string> {
    console.log('Updating Record');
    const record: RecordModel = {
      first_name: firstName,
      last_name: lastName,
      avatar: '',
      id: updatingRecordId,
      email: ''
    };
    return this.http.put<string>(
      this.apiUrl + updatingRecordId,
      record
    );
  }

  deleteRecord(index: any): Observable<void> {
    console.log('Deleting Record');
    return this.http.delete<void>(
      this.apiUrl + index
    );
  }

}
