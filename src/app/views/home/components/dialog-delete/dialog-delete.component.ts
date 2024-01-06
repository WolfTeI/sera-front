import { Component, Inject } from '@angular/core';
import { MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../store/store.actions';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {

  tabla: string = '';


  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.tabla = data.tabla;
  }

  dialogClose() {
    this.dialogRef.close();
  }

  onSubmit() {

    this.store.dispatch(StoreActions.loadDeleteTable({ tabla: this.tabla }));
    this.dialogRef.close({ reload: true });
  }
}
