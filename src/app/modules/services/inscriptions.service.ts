import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscriptionHistory } from '../../core/models/historial.interface';

@Injectable({
  providedIn: 'root'
})
export class InscriptionHistoryService {
  private apiUrl = 'http://localhost:3000/inscription-history';

  constructor(private http: HttpClient) {}

  getHistory(): Observable<InscriptionHistory[]> {
    return this.http.get<InscriptionHistory[]>(this.apiUrl);
  }

  addHistory(history: InscriptionHistory): Observable<InscriptionHistory> {
    return this.http.post<InscriptionHistory>(this.apiUrl, history);
  }
}