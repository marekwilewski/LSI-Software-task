import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { RestApiService } from 'src/app/services/rest-api.service';

const datePattern = "(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])";

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {

  public error = '';

  public exchangeRates$: Observable<any> = new Observable<[]>;

  public exchangeRateDate = new FormControl<string>('', Validators.pattern(datePattern));

  // public datePattern = "^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";



  constructor(private restApiService: RestApiService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllExchangeRates();
    this.exchangeRateDate.valueChanges.subscribe(() => {
      const selectedDate = this.datePipe.transform(this.exchangeRateDate.value, "yyyy-MM-dd");
      if (selectedDate) {
        this.getExchangeRatesByDate(selectedDate);
      } else {
        this.getAllExchangeRates();
      }
    });
  }

  getAllExchangeRates() {
    this.exchangeRates$ = this.restApiService.getAllExchangeRates()
      .pipe(
        map((response: any) => response[0].rates),
        catchError(err => {
          this.error = err.statusText;
          return of([]);
        })
      )
  }

  getExchangeRatesByDate(selectedDate: string) {
    this.exchangeRates$ = this.restApiService.getExchangeRatesByDate(selectedDate)
      .pipe(
        map((response: any) => response[0].rates),
        catchError(err => {
          this.error = err.statusText;
          return of([]);
        })
      )
  }

  clearDate() {
    this.exchangeRateDate.setValue('');
    this.error = '';
  }

}
