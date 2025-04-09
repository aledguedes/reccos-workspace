import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  buscarCEP(cep: string): Observable<Endereco> {
    cep = cep.replace(/\D/g, '');
    return this.http.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
