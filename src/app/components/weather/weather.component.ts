import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  weatherForm!: FormGroup;
  weather: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService) { }
  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ["", [Validators.required]]
    })
  }
  search() {
    console.log("Here is object", this.weatherForm.value);
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (response) => {
        console.log("Here is respone from API", response.data);
        this.weather = response.data;
      }
    );
  }
}
