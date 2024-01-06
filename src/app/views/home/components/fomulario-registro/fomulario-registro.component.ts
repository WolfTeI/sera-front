import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../store/store.actions';
import { FormNewTableComponent } from '../form-new-table/form-new-table.component';
import { Observable } from 'rxjs';
import { Campos } from 'src/app/interfaces/campos.interfaces';
import { selectCampos } from '../../store/store.selectors';
import { FormFields } from 'src/app/interfaces/form.interfaces';
import { NewRecord } from 'src/app/interfaces/registros.interfaces';

@Component({
  selector: 'app-fomulario-registro',
  templateUrl: './fomulario-registro.component.html',
  styleUrl: './fomulario-registro.component.scss',
})
export class FomularioRegistroComponent {
  isUpload: boolean = false;
  newRegister!: FormGroup;
  TableName: string = '';
  campos!: Observable<Campos[]>;
  formFields: FormFields[] = [];
  formControlFields: { [key: string]: any } = {};
  id: string;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<FormNewTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.TableName = data.tabla;
    this.id = data.id;
    this.isUpload = data.upload;
    const contenidoTabla = data.contenido;
    this.campos = this.store.select(selectCampos);

    this.campos.subscribe({
      next: (campos) => {
        campos.forEach((campo) => {
          if (campo.Field !== `id_${this.TableName}`) {
            let field: FormFields = {
              field: campo.Field,
              label: campo.Field,
              type: 'text',
              value:
                contenidoTabla !== undefined
                  ? this.cargarContenido(contenidoTabla, campo.Field)
                  : '',
            };
            this.formFields.push(field);
          }
        });
        this.crearCampos();
      },
    });
  }

  cargarContenido(contenido: any, index: string) {
    let resultado: string = '';
    contenido.forEach((element: any) => {
      if (element[`id_${this.TableName}`] === this.id) {
        resultado = element[index];
      }
    });
    return resultado;
  }

  crearCampos() {
    this.formFields.forEach((field) => {
      this.crearCampo(field);
    });
    this.newRegister = this.fb.group(this.formControlFields);
  }

  crearCampo(field: FormFields) {
    this.formControlFields[field.field] = [field.value, [Validators.required]];
  }

  dialogClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    const nombreTabla = this.TableName;
    let campos: string[] = [];
    let contenido: string[] = [];

    this.formFields.forEach((field, index) => {
      campos.push(`${field.field}`);
      contenido.push(`"${this.newRegister.value[field.field]}"`);
    });

    let registro: NewRecord = {
      id: null,
      tabla: nombreTabla,
      campos: campos,
      contenido: contenido,
    };
    if (this.isUpload) {
      registro.id = parseInt(this.id);
      this.store.dispatch(
        StoreActions.loadUpdateRecord({ registro: registro })
      );
    } else {
      this.store.dispatch(StoreActions.loadNewRecord({ registro: registro }));
    }

    this.dialogRef.close({ reload: true });
  }
}
