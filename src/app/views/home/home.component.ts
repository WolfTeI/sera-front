import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreActions } from './store/store.actions';
import { ConfigData } from './store/store.reducer';
import { Observable } from 'rxjs';
import { selectConfigData } from './store/store.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  configData: Observable<ConfigData>;

  constructor(private store: Store) {
    this.store.dispatch(StoreActions.loadStores());
    this.configData = this.store.select(selectConfigData);
  }

  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(tabName: string) {
    this.tabs.push(tabName);
    this.selected.setValue(this.tabs.length - 1);
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
}
