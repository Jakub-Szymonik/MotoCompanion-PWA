import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";
import { IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../services/weatherservice';




@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class WeatherPage implements OnInit {



  cityName: string = '';
  temperature: number = 0;
  precipitation: number = 0;
  

  constructor(private weatherService: WeatherService) { }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    const lat = coordinates.coords.latitude;
    const lon = coordinates.coords.longitude;


    forkJoin({
      weather: this.weatherService.getWeatherData(lat, lon),
      city: this.weatherService.getCityName(lat, lon)
    })

      .subscribe(results => {
        this.temperature = results.weather.current.temperature_2m;
        this.cityName = results.city.address.town || results.city.address.city || results.city.address.county;
        this.precipitation = results.weather.current.precipitation_probability;
      });


  }
}
