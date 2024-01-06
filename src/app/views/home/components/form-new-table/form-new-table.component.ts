import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../store/store.actions';
import { NuevaTabla } from 'src/app/interfaces/tablas.interfaces';
import { FormFields } from 'src/app/interfaces/form.interfaces';



@Component({
  selector: 'app-form-new-table',
  templateUrl: './form-new-table.component.html',
  styleUrl: './form-new-table.component.scss',
})
export class FormNewTableComponent {
  newTable!: FormGroup;
  TableNameField: FormFields = {
    field: 'tableName',
    label: 'Nombre de la tabla',
    type: 'text',
    value: '',
  }
  formFields: FormFields[] = [
    { field: 'field1', label: 'campo', type: 'text', value: '' },
  ];
  formControlFields: { [key: string]: any } = {};

  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<FormNewTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.crearCampos();
  }

  crearCampos(){
    this.formControlFields[this.TableNameField.field] = [
      this.TableNameField.value,
      [Validators.required],
    ]
    this.formFields.forEach((field) => {
      this.crearCampo(field);
    });
    this.newTable = this.fb.group(this.formControlFields);
  }

  crearCampo(field: FormFields){
    this.formControlFields[field.field] = [
      field.value,
      [Validators.required],
    ];
  }


  agregarCampo() {
    let campo = {
      field: `field${this.formFields.length + 1}`,
      label: `campo${this.formFields.length + 1}`,
      type: 'text',
      value: '',
    }

    this.TableNameField['value'] = this.newTable.value[this.TableNameField.field];
    this.formFields.forEach((field) => {
      field['value'] = this.newTable.value[field.field];
    });

    this.formFields.push(campo);
    this.crearCampos();
  }

  dialogClose(){
    this.dialogRef.close()
  }

  onSubmit(){
    const nombreTabla = this.newTable.value[this.TableNameField.field].split(' ').join('_').toLowerCase();
    let campos: string[] = [];
    this.formFields.forEach((field) => {
      campos.push(this.newTable.value[field.field].split(' ').join('_').toLowerCase())
    });

    let cuerpoSQL = ''

    campos.forEach((campo, index) => {
      if(index == campos.length - 1){
      cuerpoSQL += `${campo} VARCHAR(255) NOT NULL`
    }else{
      cuerpoSQL += `${campo} VARCHAR(255) NOT NULL, `
    }
    });
    
    let nuevaTabla: NuevaTabla = {
      nombre: nombreTabla,
      campos: cuerpoSQL,
    }
    
    this.store.dispatch(StoreActions.loadNewTable({ tabla: nuevaTabla }));

    this.dialogRef.close({reload: true})
  }
}
