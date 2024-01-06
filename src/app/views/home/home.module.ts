import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from './store/store.effects';
import { storeFeature } from './store/store.reducer';
import { TableComponent } from './components/table/table.component';
import { FormNewTableComponent } from './components/form-new-table/form-new-table.component';
import { CoreModule } from 'src/app/core/core.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FomularioRegistroComponent } from './components/fomulario-registro/fomulario-registro.component';
import { ConfigDataDialogComponent } from './components/config-data-dialog/config-data-dialog.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    TableComponent,
    FormNewTableComponent,
    FomularioRegistroComponent,
    ConfigDataDialogComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forFeature(storeFeature),
    EffectsModule.forFeature([StoreEffects])
  ],
  providers: [
    {provide:MatDialogRef , useValue:{} },

        { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class HomeModule { }
