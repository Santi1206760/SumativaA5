import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://api.weatherapi.com/v1/current.json';
  private apiKey = '7c52d0f09bb14310a09152300242404'; // Reemplaza con tu clave API de WeatherAPI

  constructor(private http: HttpClient) {}

  getWeatherDetails(): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=Ecuador`;
    return this.http.get(url).pipe(
      tap(data => console.log('Data received:', data)),
      catchError(error => {
        console.error('Error fetching Weather details:', error);
        throw error;
      })
    );
  }
}
