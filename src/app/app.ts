import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiTableBarsHostModule } from '@taiga-ui/addon-tablebars';
import { TuiPushModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TuiRootModule,
    TuiTableBarsHostModule,
    TuiDialogModule,
    TuiPushModule,
    TuiAlertModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
