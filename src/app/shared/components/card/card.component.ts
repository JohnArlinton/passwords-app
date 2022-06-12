import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { Password } from 'src/app/state/passwords/passwords.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Output() clicked = new EventEmitter<{ item: Password; type: number }>();
  @Input()
  item!: Password;

  @ViewChild('tooltip') manualTooltip: MatTooltip | undefined;

  constructor() {}

  ngOnInit(): void {}

  changeTooltip() {
    this.manualTooltip!.disabled = false;
    this.manualTooltip!.show();
    setTimeout(() => {
      this.manualTooltip!.hide();
      this.manualTooltip!.disabled = true;
    }, 500)
  }
}
