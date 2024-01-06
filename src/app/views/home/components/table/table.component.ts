import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Campos } from 'src/app/interfaces/campos.interfaces';
import { Store } from '@ngrx/store';
import { selectCampos, selectContenido } from '../../store/store.selectors';
import { SelectionModel } from '@angular/cdk/collections';
import { FomularioRegistroComponent } from '../fomulario-registro/fomulario-registro.component';
import { MatDialog } from '@angular/material/dialog';
import { StoreActions } from '../../store/store.actions';
import { DeleteRecord } from 'src/app/interfaces/registros.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() tabla!: string;
  @Output() elementosSeleccionados: EventEmitter<any> = new EventEmitter<any>();

  campos!: Observable<Campos[]>;
  contenido!: Observable<any>;
  campoSeleccion!: string;

  displayedColumns: string[] = [];
  dataSource: string[] = [];
  selection = new SelectionModel<any>(true, []);

  constructor(private store: Store, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.campos = this.store.select(selectCampos);
    this.contenido = this.store.select(selectContenido);
    this.campoSeleccion = `select${this.tabla}`;
    this.campos.subscribe({
      next: (campos) => {
        this.displayedColumns = [this.campoSeleccion];

        campos.forEach((campo) => {
          if(campo.Field !== `id_${this.tabla}`){
            this.displayedColumns.push(campo.Field);
          }
        });
        this.displayedColumns.push('actions');
      },
    });

    this.contenido.subscribe({
      next: (contenido) => {
        this.dataSource = contenido;
      },
    });
  }

  ngOnDestroy() {
    console.log(this.tabla, 'destroyed');
  }

  emitSelected(row: any) {
    this.selection.toggle(row);
    this.elementosSeleccionados.emit(this.selection);
  }

  emitAllSelected() {
    this.toggleAllRows();
    this.elementosSeleccionados.emit(this.selection);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  openDialogUploadRegistro(id: string) {
    const dialogRef = this.dialog.open(FomularioRegistroComponent, {
      width: '500px',
      data: { message: 'Actualizar Registro', tabla: this.tabla, contenido: this.dataSource, id: id,  upload: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.snackBar.open('Registro Actualizado', '', { duration: 3000 });
        this.store.dispatch(StoreActions.loadContenido({ tabla: this.tabla }));
      }
    });
  }

  eliminarRegistro(id: string) {
    const tablaAEleiminar: DeleteRecord = {
      tabla: this.tabla,
      ids: parseInt(id),
    }
    this.store.dispatch(StoreActions.loadDeleteRecord({ deleteRecord: tablaAEleiminar }));
    this.store.dispatch(StoreActions.loadContenido({ tabla: this.tabla }));
    this.snackBar.open('Registro Eliminado', '', { duration: 3000 });
  }

}
