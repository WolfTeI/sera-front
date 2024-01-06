import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreActions } from './store/store.actions';
import { Observable } from 'rxjs';
import { selectConfigData, selectTablas } from './store/store.selectors';
import { FormControl } from '@angular/forms';
import { ConfigData } from 'src/app/interfaces/configData.interfaces';
import { Tablas } from 'src/app/interfaces/tablas.interfaces';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { FormNewTableComponent } from './components/form-new-table/form-new-table.component';
import { FomularioRegistroComponent } from './components/fomulario-registro/fomulario-registro.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  configData: Observable<ConfigData>;
  tablas: Observable<Tablas[]>;

  tabs: string[] = [];
  selected = new FormControl(0);
  elementos: SelectionModel<any> = new SelectionModel<any>(true, []);

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.store.dispatch(StoreActions.loadStores());
    this.store.dispatch(StoreActions.loadListadoTablas());
    this.configData = this.store.select(selectConfigData);
    this.tablas = this.store.select(selectTablas);
  }

  selectTab(event: MatTabChangeEvent) {
    this.store.dispatch(
      StoreActions.loadCampos({ tabla: this.tabs[event.index] })
    );
    this.store.dispatch(
      StoreActions.loadContenido({ tabla: this.tabs[event.index] })
    );
  }

  addTab(tabName: string) {
    if (!this.tabs.includes(tabName)) {
      this.tabs.push(tabName);
      this.selected.setValue(this.tabs.length - 1);
      this.store.dispatch(
        StoreActions.loadCampos({
          tabla: this.tabs[this.selected.value ? this.selected.value : 0],
        })
      );
      this.store.dispatch(
        StoreActions.loadContenido({
          tabla: this.tabs[this.selected.value ? this.selected.value : 0],
        })
      );
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
    if (index >= 1) {
      this.store.dispatch(
        StoreActions.loadCampos({ tabla: this.tabs[index - 1] })
      );
      this.store.dispatch(
        StoreActions.loadContenido({ tabla: this.tabs[index - 1] })
      );
    } else if (index === 0 && this.tabs.length > 0) {
      this.store.dispatch(StoreActions.loadCampos({ tabla: this.tabs[index] }));
      this.store.dispatch(
        StoreActions.loadContenido({ tabla: this.tabs[index] })
      );
    }
  }

  elementosSeleccionados(elementos: SelectionModel<any>) {
    this.elementos = elementos;
  }

  mostrarElementosSeleccionados() {
    this.elementos.clear();
  }

  openDialogNuevaTabla() {
    const dialogRef = this.dialog.open(FormNewTableComponent, {
      width: '500px',
      data: { message: 'Crear nueva Tabla' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open( 'Tabla creada correctamente', '', { duration: 3000 }
      )
        this.store.dispatch(StoreActions.loadListadoTablas());
      }
    });
  }

  openDialogNuevoRegistro() {
    const dialogRef = this.dialog.open(FomularioRegistroComponent, {
      width: '500px',
      data: {
        message: 'Crear nuevo Registro',
        tabla: this.tabs[this.selected.value ? this.selected.value : 0],
        upload: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open( 'Nuevo Registro Creado', '', { duration: 3000 }
      )
        this.store.dispatch(
          StoreActions.loadContenido({
            tabla: this.tabs[this.selected.value ? this.selected.value : 0],
          })
        );
      }
    });
  }

  eliminarTabla() {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: {
        title: '¿Seguro que desea eliminar la tabla?',
        message: 'Perdera todos los datos de los registros.',
        tabla: this.tabs[this.selected.value ? this.selected.value : 0],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(StoreActions.loadListadoTablas());
      }
    });
  }
}
