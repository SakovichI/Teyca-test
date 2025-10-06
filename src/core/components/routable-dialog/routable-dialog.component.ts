import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiRoutableDialogComponent } from '@taiga-ui/kit';

@Component({
  selector: 'mw-routable-dialog',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService],
})
export class RoutableDialogComponent extends TuiRoutableDialogComponent {
  constructor(
    route: ActivatedRoute,
    router: Router,
    dialogs: TuiDialogService,
    injector: Injector,
    destroy$: TuiDestroyService
  ) {
    super(route, router, dialogs, injector, destroy$);

    const queryParams = route.snapshot.queryParams;

    this['navigateToParent'] = (): void => {
      void router.navigate([this['lazyLoadedBackUrl']], {
        queryParams,
        relativeTo: route,
      });
    };

    this['onDialogClosing'] = (): void => {
      if (
        this['initialUrl'] === this['router'].url ||
        this['route'].snapshot.data['dialogOptions'].isNavigateToParent
      ) {
        this['navigateToParent']();
      }
    };
  }
}
