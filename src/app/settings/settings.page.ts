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
     // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
    this.storage.set('darkMode', event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }
}