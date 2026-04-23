import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonAlert, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons,IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard,IonFab, IonFabButton, IonIcon     } from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";
import { Garageservice } from '../services/garageservice';
import { AlertController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
  standalone: true,
  imports: [IonContent, IonAlert, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonButton, CommonModule, FormsModule, RouterLink, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonFab, IonFabButton, IonIcon]
})
export class GaragePage implements OnInit {

  bikes: any[] = [];


  constructor(private garageservice: Garageservice, private alertController: AlertController, private storage: Storage) { }

  async addBike(make: string, model: string, year: number) {
    const newBike = { make, model, year };

    await this.garageservice.addBike(newBike);
    this.bikes = await this.garageservice.getBikes() || [];

  }

  async deleteBike(index: number) {
    await this.garageservice.deleteBike(index);
    this.bikes = await this.garageservice.getBikes() || [];
  }

  async presentAddBikeAlert() {
    const alert = await this.alertController.create({
      header: 'Add Bike',
      inputs: [
        { name: 'make', type: 'text', placeholder: 'Make' },
        { name: 'model', type: 'text', placeholder: 'Model' },
        { name: 'year', type: 'number', placeholder: 'Year' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add', handler: (data) => {
            this.addBike(data.make, data.model, data.year);
          }
        }
      ]
    });
    await alert.present();
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.bikes = await this.garageservice.getBikes() || [];
  }

  ngOnInit() {
    
  }

}
