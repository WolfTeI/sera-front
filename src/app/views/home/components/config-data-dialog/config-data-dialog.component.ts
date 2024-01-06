import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  ConfigData,
  UserConfig,
} from 'src/app/interfaces/configData.interfaces';
import { selectConfigData } from '../../store/store.selectors';
import { Observable } from 'rxjs';
import { StoreActions } from '../../store/store.actions';

@Component({
  selector: 'app-config-data-dialog',
  templateUrl: './config-data-dialog.component.html',
  styleUrl: './config-data-dialog.component.scss',
})
export class ConfigDataDialogComponent {
  formConfigurations!: FormGroup;
  configData: Observable<ConfigData>;

  nombreApp!: string;
  user!: UserConfig;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfigDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.configData = this.store.select(selectConfigData);

    this.configData.subscribe((data) => {
      this.nombreApp = data.nombreApp;
      this.user = data.user;
    });
    this.createForm();
  }

  createForm() {
    this.createFields();
  }

  createFields() {
    this.formConfigurations = this.fb.group({
      nombre: this.user.nombre,
      grado: this.user.grado,
      institucion: this.user.institucion,
      dependencia: this.user.dependencia,
      oficina: this.user.oficina,
      membrete: this.user.membrete,
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    let obj: ConfigData = {
      nombreApp: this.nombreApp,
      user: {
        nombre: this.formConfigurations.value.nombre,
        grado: this.formConfigurations.value.grado,
        institucion: this.formConfigurations.value.institucion,
        dependencia: this.formConfigurations.value.dependencia,
        oficina: this.formConfigurations.value.oficina,
        membrete: this.formConfigurations.value.membrete,
      },
    };

    this.store.dispatch(
      StoreActions.loadUpdateConfig(
        StoreActions.loadUpdateConfig({ data: obj })
      )
    );
    this.dialogRef.close({ reload: true });
  }
}
