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


@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature(storeFeature),
    EffectsModule.forFeature([StoreEffects])
  ]
})
export class HomeModule { }
