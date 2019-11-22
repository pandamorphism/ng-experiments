import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayExampleComponent} from './overlay-example.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {DynamicWidgetComponent} from './dynamic-widget/dynamic-widget.component';


@NgModule({
  declarations: [OverlayExampleComponent, DynamicWidgetComponent],
  exports: [OverlayExampleComponent],
  entryComponents: [DynamicWidgetComponent],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ]
})
export class OverlayExampleModule {
}
