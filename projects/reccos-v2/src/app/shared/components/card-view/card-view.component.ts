import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  imports: [TitleCasePipe], // Adicione o TitleCasePipe ao array de imports do componente
})
export class CardViewComponent {
  @Input() items: any[] = [];
  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {
    console.log('items', this.items);
  }
}
