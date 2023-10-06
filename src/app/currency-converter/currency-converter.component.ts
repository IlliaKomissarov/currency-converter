import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  exchangeRates: any = {};
  selectedFromCurrency = 'EUR';
  selectedToCurrency = 'USD';
  amountToConvert: number | undefined;
  convertedAmount: number | undefined;
  currencies: string[] = ['USD', 'EUR', 'UAH'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadExchangeRates();
    this.loadSelectedCurrencies();
  }

  loadExchangeRates(): void {
    const apiKey = 'ed9eba27114746c6974520220144a27b';
    const apiUrl = `https://open.er-api.com/v6/latest/UAH?apikey=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.exchangeRates = data.rates;
      },
      (error) => {
        console.error('Failed to load exchange rates', error);
      }
    );
  }

  loadSelectedCurrencies(): void {
    const fromCurrency = localStorage.getItem('fromCurrency');
    const toCurrency = localStorage.getItem('toCurrency');

    if (fromCurrency && this.currencies.includes(fromCurrency)) {
      this.selectedFromCurrency = fromCurrency;
    }

    if (toCurrency && this.currencies.includes(toCurrency)) {
      this.selectedToCurrency = toCurrency;
    }
  }

  saveSelectedCurrencies(): void {
    localStorage.setItem('fromCurrency', this.selectedFromCurrency);
    localStorage.setItem('toCurrency', this.selectedToCurrency);
  }

  convertCurrency(): void {
    if (this.amountToConvert) {
      const fromRate = this.exchangeRates[this.selectedFromCurrency];
      const toRate = this.exchangeRates[this.selectedToCurrency];
      this.convertedAmount = (this.amountToConvert / fromRate) * toRate;
      this.saveSelectedCurrencies();
    }
  }
}
