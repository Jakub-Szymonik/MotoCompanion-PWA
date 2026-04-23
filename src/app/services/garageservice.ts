import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class Garageservice {
  constructor(private storage:Storage) { }

  async getBikes(): Promise<any> {
    await this.storage.create();
    return this.storage.get('bikes');
  }

  async addBike(bike: any): Promise<any> {
    await this.storage.create();
    const bikes = await this.getBikes() || [];
    bikes.push(bike);
    return this.storage.set('bikes', bikes);
  }

  async deleteBike(id: number): Promise<any> {
    await this.storage.create();
    const bikes = await this.getBikes() || [];
    bikes.splice(id, 1);
    return this.storage.set('bikes', bikes);
  }
  
}
