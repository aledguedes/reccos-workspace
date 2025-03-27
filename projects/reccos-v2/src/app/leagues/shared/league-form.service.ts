import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeagueFormService {
  // BehaviorSubject para armazenar o estado atual do formulário
  private formDataSubject = new BehaviorSubject<any>({});

  // Observable público para componentes se inscreverem
  public formData$: Observable<any> = this.formDataSubject.asObservable();

  constructor() {}

  // Método para atualizar o estado do formulário
  updateFormData(data: any): void {
    const currentData = this.formDataSubject.getValue();
    this.formDataSubject.next({ ...currentData, ...data });
  }

  // Método para obter o estado atual do formulário
  getFormData(): any {
    return this.formDataSubject.getValue();
  }

  // Método para limpar o estado do formulário
  clearFormData(): void {
    this.formDataSubject.next({});
  }

  // Método para preparar os dados para envio à API
  prepareDataForApi(): any {
    const formData = this.getFormData();

    // Aqui você pode adicionar transformações ou validações adicionais
    // antes de enviar os dados para a API

    return {
      ...formData,
      // Exemplo de transformação de datas para ISO string
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      // Adicionar campos calculados ou transformados se necessário
      createdAt: new Date().toISOString(),
    };
  }
}
