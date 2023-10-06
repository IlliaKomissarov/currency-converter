// currency-header.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.css'],
})
export class CurrencyHeaderComponent implements OnInit {
  exchangeRates: any;
  priceForOneUSD: number | undefined;
  priceForOneEUR: number | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates() {
    const apiKey = 'ed9eba27114746c6974520220144a27b';
    const apiUrl = `https://open.er-api.com/v6/latest/UAH?apikey=${apiKey}`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.exchangeRates = data.rates;
      this.calculatePrices();
    });
  }

  calculatePrices() {
    if (this.exchangeRates) {
      this.priceForOneUSD = 1 / this.exchangeRates.USD;
      this.priceForOneEUR = 1 / this.exchangeRates.EUR;
    }
  }
}
