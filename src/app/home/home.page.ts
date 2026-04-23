import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Torch } from '@capawesome/capacitor-torch';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink],
})
export class HomePage {
  constructor(private storage: Storage) {}

  username: string = '';
  TorchOn: boolean = false;

  async toggleTorch() {
    await Torch.toggle();
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.username = await this.storage.get('username') || '';
  }



}
