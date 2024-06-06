import { Component, Input } from '@angular/core';

@Component({
  selector: '[#app-viewer]',
  standalone: true,
  imports: [],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent {
  @Input() src!: string;
}
