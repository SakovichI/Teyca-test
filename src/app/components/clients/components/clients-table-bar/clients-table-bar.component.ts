import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { ClientActionType, CLIENT_ACTION_LABEL_MAP, Client } from '../../../../api/client';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'app-clients-table-bar',
  imports: [TuiBadgeModule, TuiButtonModule],
  templateUrl: './clients-table-bar.component.html',
  styleUrl: './clients-table-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableBarComponent {
  $isDisabled = input.required<boolean>({ alias: 'isDisabled' });
  $selectedClients = input.required<Client[]>({ alias: 'selectedClients' });
  $selectedCount = input.required<number>({ alias: 'selectedCount' });

  actionClicked = output();

  readonly ClientActionType = ClientActionType;
  readonly ClientActionLabelsMap = CLIENT_ACTION_LABEL_MAP;

  onTriggerAction(): void {
    this.actionClicked.emit();
  }
}
