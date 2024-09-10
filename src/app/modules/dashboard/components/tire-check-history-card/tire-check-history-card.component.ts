import { Component, Input } from '@angular/core';
import { TireCheckUpTableDTO } from '../../../../dtos/TireCheckUpTableDTO';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NumberCategoryPipe } from '../../../../pipe/NumberCategoryPipe ';

@Component({
  selector: 'tire-check-history-card',
  standalone: true,
  imports: [MatDialogModule, NumberCategoryPipe],
  templateUrl: './tire-check-history-card.component.html',
  styleUrl: './tire-check-history-card.component.scss',
})
export class TireCheckHistoryCardComponent {
  @Input() tirecheck!: TireCheckUpTableDTO;

  constructor(public dialog: MatDialog) {}

  showTireCheckDetails() {}
}
