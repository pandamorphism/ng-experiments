import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverlayExampleModule} from './overlay-example/overlay-example.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
