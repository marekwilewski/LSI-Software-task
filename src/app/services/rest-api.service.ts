import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { ExchangeRate } from "../model/exchangeRate";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  getAllExchangeRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(`https://api.nbp.pl//api/exchangerates/tables/A/?format=json`)
  }

  getExchangeRatesByDate(date: string): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(`https://api.nbp.pl//api/exchangerates/tables/A/${date}/?format=jsom`)
  }
}
