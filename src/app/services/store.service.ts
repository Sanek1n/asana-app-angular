import { Injectable } from '@angular/core';
import { Store } from 'app/models/app-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storeSubject: BehaviorSubject<Store>;

  private store: Observable<Store>;

  constructor() {
    let localData: Store | null = JSON.parse(localStorage.getItem('asana-store')!);
    if (!localData) {
      localData = new Store();
    }
    this.storeSubject = new BehaviorSubject(localData);
    this.store = this.storeSubject.asObservable();
  }

  public get storeValue(): Store {
    return this.storeSubject.value;
  }

  public loadStore(): Observable<Store> {
    let localData: Store | null = JSON.parse(localStorage.getItem('asana-store')!);
    if (!localData) {
      localData = new Store();
    }
    this.storeSubject.next(localData);
    return this.store;
  }

  public saveStore(store: Store): Observable<Store> {
    this.storeSubject.next(store);
    localStorage.setItem('asana-store', JSON.stringify(this.storeValue));
    return this.store;
  }
}
