import { Injectable } from '@angular/core';
import { MovieAPI } from 'src/app/models/movieAPI';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): string[] {
    if (this.storage.length) {
      return JSON.parse(this.storage.getItem(key)??'');
    }
    return [];
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(){
    this.storage.clear()
  }
}
