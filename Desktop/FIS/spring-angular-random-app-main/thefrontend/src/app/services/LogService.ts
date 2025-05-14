import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogService {
  private url = 'http://localhost:9200/logs/_search';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<any> {
    const body = {
      query: { match_all: {} },
      sort: [{ "timestamp": { order: "desc" } }],
      size: 100
    };
    return this.http.post(this.url, body);
  }
}
