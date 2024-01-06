import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfigData } from 'src/app/interfaces/configData.interfaces';
import { ConfigDataDialogComponent } from '../config-data-dialog/config-data-dialog.component';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../store/store.actions';
import { Observable } from 'rxjs';
import { selectConfigData } from '../../store/store.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  data!: ConfigData | null;
  @Input() drawer!: MatDrawer
  configData: Observable<ConfigData>;

  constructor(private store: Store, public dialog: MatDialog) {
    this.configData = this.store.select(selectConfigData);
    this.configData.subscribe((data) => {
      this.data = data;
    });
   }
  ngOnInit(): void {}

  openDialogConfig() {
    
    const dialogRef = this.dialog.open(ConfigDataDialogComponent, {
      width: '500px',
      data: { message: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.store.dispatch(StoreActions.loadStores());
      }
    });
  }

}
