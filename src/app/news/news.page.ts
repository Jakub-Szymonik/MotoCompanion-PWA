import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import { IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Newsservice } from '../services/newsservice';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, CommonModule, FormsModule, RouterLink, IonBackButton, IonButtons]
})
export class NewsPage implements OnInit {

  news: any[] = [];

  constructor(private newsservice: Newsservice) { }

  ngOnInit() {
    this.newsservice.getMotorcycleNews().subscribe((data: any) => {
      this.news = data.articles;
    });
  }

}
