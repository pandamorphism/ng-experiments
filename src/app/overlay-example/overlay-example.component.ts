import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CdkOverlayOrigin, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {DynamicWidgetComponent} from './dynamic-widget/dynamic-widget.component';

@Component({
  selector: 'app-overlay-example',
  templateUrl: './overlay-example.component.html',
  styleUrls: ['./overlay-example.component.scss']
})
export class OverlayExampleComponent implements OnInit {
  @ViewChild(CdkOverlayOrigin, {static: false}) overlayOrigin: CdkOverlayOrigin;
  private overlayRef;

  constructor() {
  }

  ngOnInit() {
  }

  openOverlay() {
    // const strategy = this.overlay.position().connectedTo(
    //   this.overlayOrigin.elementRef,
    //   {originX: 'end', originY: 'bottom'},
    //   {overlayX: 'end', overlayY: 'top'}
    // );
    // const config = new OverlayConfig({
    //   positionStrategy: strategy,
    //   hasBackdrop: true,
    //   backdropClass: 'transparent'
    // });
    // this.overlayRef = this.overlay.create(config);
    // this.overlayRef.attach(
    //   new ComponentPortal(DynamicWidgetComponent, this.vcr)
    // );
    // this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
