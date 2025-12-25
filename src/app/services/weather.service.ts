import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherURL: string = "http://localhost:3000/weather"
  constructor(private http: HttpClient) { }

  searchWeather(obj: any) {
    return this.http.post<{ data: any }>(this.weatherURL, obj);
  }
}
