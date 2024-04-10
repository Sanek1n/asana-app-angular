import { Injectable } from '@angular/core';
import { Store } from 'app/models/app-models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storeData: Store;

  constructor() {
    let localData: Store | null = JSON.parse(localStorage.getItem('asana-store')!);
    localData = new Store(localData?.tasks, localData?.users);
    this.storeData = localData;
  }

  get store(): Store {
    const localData: Store | null = JSON.parse(localStorage.getItem('asana-store')!);
    this.storeData = new Store(localData?.tasks, localData?.users);
    return this.storeData;
  }

  set store(newStore: Store) {
    localStorage.setItem('asana-store', JSON.stringify(newStore));
    this.storeData = new Store(newStore?.tasks, newStore?.users);
  }
}
