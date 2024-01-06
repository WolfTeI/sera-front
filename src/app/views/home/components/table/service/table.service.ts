import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campos } from 'src/app/interfaces/campos.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getCampos(tabla: string): Observable<Campos[]> {
    console.log(tabla);
    
    return this.http.get<Campos[]>(`http://localhost:3000/campos/${tabla}`);
  }

  getContenido(tabla: string): Observable<any> {
    console.log(tabla);
    return this.http.get<any>(`http://localhost:3000/contenido/${tabla}`);
  }
}
