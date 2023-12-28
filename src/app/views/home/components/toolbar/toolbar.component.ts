import { Component, Input } from '@angular/core';
import { ConfigData } from '../../store/store.reducer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input() data!: ConfigData | null;

}
