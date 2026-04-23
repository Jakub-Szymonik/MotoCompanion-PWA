import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonCard, IonButton, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";
import { IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonCard, IonButton, IonLabel, IonToggle, CommonModule, FormsModule, RouterLink, IonBackButton, IonButtons]
})
export class SettingsPage implements OnInit {

  constructor(private storage: Storage) { }

  username: string = '';
  paletteToggle = false;

  async saveUsername() {
    await this.storage.create();
    await this.storage.set('username', this.username);
  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.username = await this.storage.get('username') || '';
    this.paletteToggle = await this.storage.get('darkMode') || false;
    this.toggleDarkPalette(this.paletteToggle);
  
  }

  

  ngOnInit() {
     
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    
    this.initializeDarkPalette(prefersDark.matches);

    
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
    this.storage.set('darkMode', event.detail.checked);
  }

  
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }
}